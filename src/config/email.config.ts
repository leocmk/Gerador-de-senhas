// Configuração do EmailJS para envio de emails
export const EMAIL_CONFIG = {
  // Para usar o EmailJS, você precisa:
  // 1. Criar uma conta em https://www.emailjs.com/
  // 2. Criar um serviço de email (Gmail, Outlook, etc.)
  // 3. Criar templates de email
  // 4. Obter sua chave pública
  
  SERVICE_ID: 'service_gerador_senhas',
  TEMPLATE_ID_PASSWORD_RESET: 'template_password_reset',
  TEMPLATE_ID_WELCOME: 'template_welcome',
  PUBLIC_KEY: 'sua_chave_publica_aqui', // Substitua pela sua chave real
  
  // Configurações de fallback para desenvolvimento
  FALLBACK_ENABLED: true,
  FALLBACK_CONSOLE_LOG: true,
} as const;

// Template de email para recuperação de senha
export const EMAIL_TEMPLATES = {
  PASSWORD_RESET: {
    subject: 'Redefinição de senha - Gerador de Senhas Seguras',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Redefinição de senha</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f172a; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Gerador de Senhas Seguras</h1>
          </div>
          <div class="content">
            <h2>Redefinição de senha</h2>
            <p>Olá,</p>
            <p>Você solicitou a redefinição de sua senha no Gerador de Senhas Seguras.</p>
            <p>Clique no botão abaixo para redefinir sua senha:</p>
            <a href="{{reset_url}}" class="button">Redefinir Senha</a>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="background: #e2e8f0; padding: 10px; border-radius: 5px; word-break: break-all; font-family: monospace;">{{reset_url}}</p>
            <p><strong>Token de reset:</strong> {{reset_token}}</p>
            <p>Este link expira em 1 hora por motivos de segurança.</p>
            <p>Se você não solicitou esta redefinição, ignore este email.</p>
          </div>
          <div class="footer">
            <p>© 2024 Gerador de Senhas Seguras. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
  WELCOME: {
    subject: 'Bem-vindo ao Gerador de Senhas Seguras!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Bem-vindo</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0f172a; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Bem-vindo ao Gerador de Senhas Seguras!</h1>
          </div>
          <div class="content">
            <h2>Olá, {{user_name}}!</h2>
            <p>Seu cadastro foi realizado com sucesso!</p>
            <p>Agora você pode gerar senhas seguras e complexas para proteger suas contas online.</p>
            <a href="{{app_url}}" class="button">Começar a Gerar Senhas</a>
            <h3>Recursos disponíveis:</h3>
            <ul>
              <li>✅ Geração de senhas personalizáveis</li>
              <li>✅ Múltiplos tipos de caracteres</li>
              <li>✅ Cópia fácil para área de transferência</li>
              <li>✅ Interface moderna e intuitiva</li>
            </ul>
            <p>Obrigado por escolher nosso serviço!</p>
          </div>
          <div class="footer">
            <p>© 2024 Gerador de Senhas Seguras. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  },
} as const;
