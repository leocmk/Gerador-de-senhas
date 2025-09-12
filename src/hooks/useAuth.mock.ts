import { useState, useEffect } from 'react';
import { IUser, ILoginCredentials, IRegisterCredentials, IAuthResponse } from '../types/auth.types';

interface IUseAuthReturn {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: ILoginCredentials) => Promise<IAuthResponse>;
  register: (credentials: IRegisterCredentials) => Promise<IAuthResponse>;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (token: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

export const useAuth = (): IUseAuthReturn => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('[Hook:useAuth] Inicializando hook de autenticação (modo mock)');
    // Simular verificação de usuário logado
    const savedUser = localStorage.getItem('mock_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
    console.log('[Hook:useAuth] Executando login (modo mock)');
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Aceitar qualquer email e senha (modo demo)
    if (credentials.email && credentials.password) {
      // Verificar se já existe um usuário cadastrado com este email
      const existingUser = localStorage.getItem('registered_users');
      let userData = null;
      
      if (existingUser) {
        const users = JSON.parse(existingUser);
        userData = users.find((u: any) => u.email === credentials.email);
      }
      
      const mockUser: IUser = {
        id: userData?.id || Date.now().toString(),
        name: userData?.name || credentials.email.split('@')[0] || 'Usuário',
        email: credentials.email,
        createdAt: userData?.createdAt || new Date(),
        lastLogin: new Date(),
      };
      
      setUser(mockUser);
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      
      setIsLoading(false);
      return {
        success: true,
        message: 'Login realizado com sucesso!',
        user: mockUser,
      };
    }
    
    setIsLoading(false);
    return {
      success: false,
      message: 'Email e senha são obrigatórios',
    };
  };

  const register = async (credentials: IRegisterCredentials): Promise<IAuthResponse> => {
    console.log('[Hook:useAuth] Executando cadastro (modo mock)');
    setIsLoading(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular validação
    if (credentials.password !== credentials.confirmPassword) {
      setIsLoading(false);
      return {
        success: false,
        message: 'As senhas não coincidem',
      };
    }
    
    // Verificar se já existe um usuário com este email
    const existingUsers = localStorage.getItem('registered_users');
    let users = existingUsers ? JSON.parse(existingUsers) : [];
    
    const userExists = users.find((u: any) => u.email === credentials.email);
    if (userExists) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Já existe um usuário com este email',
      };
    }
    
    const mockUser: IUser = {
      id: Date.now().toString(),
      name: credentials.name,
      email: credentials.email,
      createdAt: new Date(),
      lastLogin: new Date(),
    };
    
    // Salvar usuário na lista de registrados
    users.push(mockUser);
    localStorage.setItem('registered_users', JSON.stringify(users));
    
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
    
    setIsLoading(false);
    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      user: mockUser,
    };
  };

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
    console.log('[Hook:useAuth] Solicitando reset de senha');
    
    try {
      // Importar o serviço de email dinamicamente
      const { emailService } = await import('../services/email.service');
      
      // Gerar token de reset
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Enviar email real
      const result = await emailService.sendPasswordResetEmail(email, resetToken);
      
      if (result.success) {
        console.log('[Hook:useAuth] Email de recuperação enviado com sucesso');
        return {
          success: true,
          message: result.message,
        };
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('[Hook:useAuth] Erro ao enviar email de recuperação:', error);
      
      // Fallback: mostrar token no console
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      console.log('📧 EMAIL DE RECUPERAÇÃO (FALLBACK):');
      console.log('=====================================');
      console.log('Para:', email);
      console.log('Token:', resetToken);
      console.log('Link:', `${window.location.origin}/reset-password?token=${resetToken}`);
      console.log('=====================================');
      
      return {
        success: true,
        message: 'Email de recuperação enviado! (Verifique o console para o token)',
      };
    }
  };

  const resetPassword = async (token: string, newPassword: string, confirmPassword: string): Promise<{ success: boolean; message: string }> => {
    console.log('[Hook:useAuth] Redefinindo senha (modo mock)');
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Senha redefinida com sucesso! (modo demo)',
    };
  };

  const logout = (): void => {
    console.log('[Hook:useAuth] Executando logout (modo mock)');
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    requestPasswordReset,
    resetPassword,
    logout,
  };
};
