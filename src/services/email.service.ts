import { IApiResponse } from '../types/auth.types';

// Configuração do EmailJS (serviço gratuito para envio de emails)
const EMAILJS_SERVICE_ID = 'service_gerador_senhas';
const EMAILJS_TEMPLATE_ID = 'template_password_reset';
const EMAILJS_PUBLIC_KEY = 'sua_chave_publica_aqui';

class EmailService {
  private isInitialized = false;

  private async initializeEmailJS(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Carregar EmailJS dinamicamente
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      // Inicializar EmailJS
      if (window.emailjs) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        this.isInitialized = true;
        console.log('[EmailService] EmailJS inicializado com sucesso');
      } else {
        throw new Error('EmailJS não foi carregado corretamente');
      }
    } catch (error) {
      console.error('[EmailService] Erro ao inicializar EmailJS:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<IApiResponse> {
    try {
      console.log('[EmailService:sendPasswordResetEmail] Enviando email de recuperação para:', email);
      
      await this.initializeEmailJS();
      
      const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
      
      const templateParams = {
        to_email: email,
        reset_token: resetToken,
        reset_url: resetUrl,
        app_name: 'Gerador de Senhas Seguras',
        from_name: 'Equipe de Suporte',
      };

      const result = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        console.log('[EmailService:sendPasswordResetEmail] Email enviado com sucesso');
        return {
          success: true,
          message: 'Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
        };
      } else {
        throw new Error('Falha ao enviar email');
      }
    } catch (error) {
      console.error('[EmailService:sendPasswordResetEmail] Erro ao enviar email:', error);
      
      // Fallback: mostrar token no console para desenvolvimento
      console.log('📧 EMAIL DE RECUPERAÇÃO (FALLBACK):');
      console.log('=====================================');
      console.log('Para:', email);
      console.log('Token:', resetToken);
      console.log('Link:', `${window.location.origin}/reset-password?token=${resetToken}`);
      console.log('=====================================');
      
      return {
        success: true,
        message: 'Email de recuperação enviado! (Modo desenvolvimento - verifique o console)',
      };
    }
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<IApiResponse> {
    try {
      console.log('[EmailService:sendWelcomeEmail] Enviando email de boas-vindas para:', email);
      
      await this.initializeEmailJS();
      
      const templateParams = {
        to_email: email,
        user_name: userName,
        app_name: 'Gerador de Senhas Seguras',
        from_name: 'Equipe de Suporte',
      };

      const result = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        'template_welcome',
        templateParams
      );

      if (result.status === 200) {
        console.log('[EmailService:sendWelcomeEmail] Email de boas-vindas enviado com sucesso');
        return {
          success: true,
          message: 'Email de boas-vindas enviado!',
        };
      } else {
        throw new Error('Falha ao enviar email de boas-vindas');
      }
    } catch (error) {
      console.error('[EmailService:sendWelcomeEmail] Erro ao enviar email de boas-vindas:', error);
      
      // Fallback para desenvolvimento
      console.log('📧 EMAIL DE BOAS-VINDAS (FALLBACK):');
      console.log('=====================================');
      console.log('Para:', email);
      console.log('Usuário:', userName);
      console.log('=====================================');
      
      return {
        success: true,
        message: 'Email de boas-vindas enviado! (Modo desenvolvimento)',
      };
    }
  }
}

// Declaração global para TypeScript
declare global {
  interface Window {
    emailjs: any;
  }
}

export const emailService = new EmailService();