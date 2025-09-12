import { useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { IUser, ILoginCredentials, IRegisterCredentials, IResetPasswordRequest, IResetPasswordConfirm, IAuthResponse } from '@/types/auth.types';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[Hook:useAuth] Inicializando hook de autenticação');
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (credentials: ILoginCredentials): Promise<IAuthResponse> => {
    console.log('[Hook:useAuth] Executando login');
    setIsLoading(true);
    
    try {
      const result = await authService.login(credentials);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: IRegisterCredentials): Promise<IAuthResponse> => {
    console.log('[Hook:useAuth] Executando cadastro');
    setIsLoading(true);
    
    try {
      const result = await authService.register(credentials);
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; message: string }> => {
    console.log('[Hook:useAuth] Solicitando reset de senha');
    return await authService.requestPasswordReset(email);
  };

  const resetPassword = async (token: string, newPassword: string, confirmPassword: string): Promise<{ success: boolean; message: string }> => {
    console.log('[Hook:useAuth] Redefinindo senha');
    return await authService.resetPassword(token, newPassword, confirmPassword);
  };

  const logout = (): void => {
    console.log('[Hook:useAuth] Executando logout');
    authService.logout();
    setUser(null);
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
