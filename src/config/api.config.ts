export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.gerador-senhas.com' 
    : 'http://localhost:3000/api',
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD: '/auth/reset-password',
      REFRESH_TOKEN: '/auth/refresh-token',
      LOGOUT: '/auth/logout',
    },
    EMAIL: {
      SEND_PASSWORD_RESET: '/email/send-password-reset',
      SEND_WELCOME: '/email/send-welcome',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE_PROFILE: '/user/update-profile',
      CHANGE_PASSWORD: '/user/change-password',
    },
  },
  
  TIMEOUT: 10000, // 10 segundos
  
  RETRY_ATTEMPTS: 3,
  
  RETRY_DELAY: 1000, // 1 segundo
} as const;

export const EMAIL_TEMPLATES = {
  PASSWORD_RESET: {
    SUBJECT: 'Redefinição de senha - Gerador de Senhas Seguras',
    TEMPLATE: 'password-reset',
  },
  WELCOME: {
    SUBJECT: 'Bem-vindo ao Gerador de Senhas Seguras!',
    TEMPLATE: 'welcome',
  },
} as const;
