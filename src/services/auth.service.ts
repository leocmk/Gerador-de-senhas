import { ILoginCredentials, IRegisterCredentials, IResetPasswordRequest, IResetPasswordConfirm, IAuthResponse, IApiResponse, IUser } from '@/types/auth.types';

class AuthService {
  private readonly API_BASE_URL = 'http://localhost:3000/api'; // Configurar conforme seu backend
  private readonly STORAGE_KEY = 'password_generator_auth';

  async login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    try {
      console.log('[AuthService:login] Iniciando processo de login para:', credentials.email);
      
      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: IApiResponse<{ user: IUser; token: string }> = await response.json();

      if (data.success && data.data) {
        this.setAuthData(data.data.user, data.data.token);
        console.log('[AuthService:login] Login realizado com sucesso');
        return {
          success: true,
          message: 'Login realizado com sucesso!',
          user: data.data.user,
          token: data.data.token,
        };
      }

      throw new Error(data.message || 'Erro ao realizar login');
    } catch (error) {
      console.error('[AuthService:login] Erro no login:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async register(credentials: IRegisterCredentials): Promise<IAuthResponse> {
    try {
      console.log('[AuthService:register] Iniciando processo de cadastro para:', credentials.email);
      
      if (credentials.password !== credentials.confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data: IApiResponse<{ user: IUser; token: string }> = await response.json();

      if (data.success && data.data) {
        this.setAuthData(data.data.user, data.data.token);
        console.log('[AuthService:register] Cadastro realizado com sucesso');
        return {
          success: true,
          message: 'Cadastro realizado com sucesso!',
          user: data.data.user,
          token: data.data.token,
        };
      }

      throw new Error(data.message || 'Erro ao realizar cadastro');
    } catch (error) {
      console.error('[AuthService:register] Erro no cadastro:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async requestPasswordReset(email: string): Promise<IApiResponse> {
    try {
      console.log('[AuthService:requestPasswordReset] Solicitando reset de senha para:', email);
      
      const response = await fetch(`${this.API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: IApiResponse = await response.json();

      if (data.success) {
        console.log('[AuthService:requestPasswordReset] Email de recuperação enviado');
        return {
          success: true,
          message: 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
        };
      }

      throw new Error(data.message || 'Erro ao enviar email de recuperação');
    } catch (error) {
      console.error('[AuthService:requestPasswordReset] Erro ao solicitar reset:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<IApiResponse> {
    try {
      console.log('[AuthService:resetPassword] Redefinindo senha com token');
      
      if (newPassword !== confirmPassword) {
        throw new Error('As senhas não coincidem');
      }

      const response = await fetch(`${this.API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data: IApiResponse = await response.json();

      if (data.success) {
        console.log('[AuthService:resetPassword] Senha redefinida com sucesso');
        return {
          success: true,
          message: 'Senha redefinida com sucesso! Faça login com sua nova senha.',
        };
      }

      throw new Error(data.message || 'Erro ao redefinir senha');
    } catch (error) {
      console.error('[AuthService:resetPassword] Erro ao redefinir senha:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erro interno do servidor',
      };
    }
  }

  logout(): void {
    console.log('[AuthService:logout] Realizando logout');
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = '/';
  }

  getCurrentUser(): IUser | null {
    const authData = localStorage.getItem(this.STORAGE_KEY);
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        return parsed.user || null;
      } catch (error) {
        console.error('[AuthService:getCurrentUser] Erro ao parsear dados de autenticação:', error);
        this.logout();
      }
    }
    return null;
  }

  getToken(): string | null {
    const authData = localStorage.getItem(this.STORAGE_KEY);
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        return parsed.token || null;
      } catch (error) {
        console.error('[AuthService:getToken] Erro ao parsear token:', error);
        this.logout();
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private setAuthData(user: IUser, token: string): void {
    const authData = {
      user,
      token,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
  }
}

export const authService = new AuthService();
