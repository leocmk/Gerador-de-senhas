export const APP_CONFIG = {
  name: 'Gerador de Senhas Seguras',
  version: '1.0.0',
  description: 'Gerador de senhas seguras com interface visual moderna e responsiva',
  author: 'leocmk',
  repository: 'https://github.com/leocmk/Gerador-de-senhas.git',
} as const;

export const VIDEO_CONFIG = {
  backgroundPath: '/videos/background.mp4',
  playbackRate: 1.5,
  fallbackColors: {
    primary: '#ffffff',
    secondary: '#000000',
    accent: '#808080',
  },
} as const;
