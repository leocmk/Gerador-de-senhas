import { IApiResponse } from '@/types/auth.types';

class EmailMockService {
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<IApiResponse> {
    try {
      console.log('[EmailMockService:sendPasswordResetEmail] Simulando envio de email para:', email);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso do envio
      console.log('[EmailMockService:sendPasswordResetEmail] Email simulado enviado com sucesso');
      console.log('[EmailMockService:sendPasswordResetEmail] Token de reset:', resetToken);
      console.log('[EmailMockService:sendPasswordResetEmail] Link de reset: http://localhost:3000/reset-password?token=' + resetToken);
      
      return {
        success: true,
        message: 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
      };
    } catch (error) {
      console.error('[EmailMockService:sendPasswordResetEmail] Erro ao enviar email:', error);
      return {
        success: false,
        message: 'Erro ao enviar email de recuperação',
      };
    }
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<IApiResponse> {
    try {
      console.log('[EmailMockService:sendWelcomeEmail] Simulando envio de email de boas-vindas para:', email);
      
      // Simular delay de envio
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('[EmailMockService:sendWelcomeEmail] Email de boas-vindas simulado enviado');
      console.log('[EmailMockService:sendWelcomeEmail] Bem-vindo, ' + userName + '!');
      
      return {
        success: true,
        message: 'Email de boas-vindas enviado!',
      };
    } catch (error) {
      console.error('[EmailMockService:sendWelcomeEmail] Erro ao enviar email de boas-vindas:', error);
      return {
        success: false,
        message: 'Erro ao enviar email de boas-vindas',
      };
    }
  }
}

export const emailMockService = new EmailMockService();
