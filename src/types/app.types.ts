export interface IVideoBackgroundProps {
  videoPath?: string;
  fallbackColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onColorsExtracted?: (colors: IColorPalette) => void;
}

export interface IColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  dominant: string;
  complementary: string;
}

export interface IPasswordGeneratorProps {
  onBack: () => void;
}

export interface INotification {
  message: string;
  type: 'success' | 'error';
}

export interface IPasswordHistoryEntry {
  id: string;
  password: string;
  timestamp: Date;
  length: number;
  settings: {
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  };
}