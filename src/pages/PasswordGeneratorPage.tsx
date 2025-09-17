import React, { useState, useRef } from 'react';
import { VideoBackground } from '../components/VideoBackground';

interface IPasswordGeneratorPageProps {
  onBack: () => void;
}

export const PasswordGeneratorPage: React.FC<IPasswordGeneratorPageProps> = ({
  onBack,
}) => {
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(1);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const passwordsContainerRef = useRef<HTMLDivElement>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const generatePassword = (passwordLength: number): string => {
    if (passwordLength < 4) {
      throw new Error('O comprimento da senha deve ser de pelo menos 4 caracteres.');
    }

    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      throw new Error('Selecione pelo menos um tipo de caractere.');
    }

    const charSets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    let requiredChars: string[] = [];

    if (includeLowercase) {
      availableChars += charSets.lowercase;
      requiredChars.push(getRandomChar(charSets.lowercase));
    }
    if (includeUppercase) {
      availableChars += charSets.uppercase;
      requiredChars.push(getRandomChar(charSets.uppercase));
    }
    if (includeNumbers) {
      availableChars += charSets.numbers;
      requiredChars.push(getRandomChar(charSets.numbers));
    }
    if (includeSymbols) {
      availableChars += charSets.symbols;
      requiredChars.push(getRandomChar(charSets.symbols));
    }

    const password = [...requiredChars];

    for (let i = requiredChars.length; i < passwordLength; i++) {
      password.push(getRandomChar(availableChars));
    }

    return shuffleArray(password).join('');
  };

  const getRandomChar = (charSet: string): string => {
    return charSet[Math.floor(Math.random() * charSet.length)];
  };

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleGenerate = async (): Promise<void> => {
    try {
      setIsGenerating(true);
      
      const generatedPasswords: string[] = [];
      for (let i = 0; i < count; i++) {
        const password = generatePassword(length);
        generatedPasswords.push(password);
      }

      setPasswords(generatedPasswords);
      
      setTimeout(() => {
        passwordsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      showNotification(error instanceof Error ? error.message : 'Erro ao gerar senhas', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPassword = async (password: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(password);
      showNotification('Senha copiada para a área de transferência!');
    } catch (error) {
      console.error('[PasswordGenerator:copyPassword] Erro ao copiar senha:', error);
      showNotification('Erro ao copiar senha. Tente novamente.', 'error');
    }
  };

  const copyAllPasswords = async (): Promise<void> => {
    try {
      const allPasswordsText = passwords.join('\n');
      await navigator.clipboard.writeText(allPasswordsText);
      showNotification(`${passwords.length} senhas copiadas para a área de transferência!`);
    } catch (error) {
      console.error('[PasswordGenerator:copyAllPasswords] Erro ao copiar senhas:', error);
      showNotification('Erro ao copiar senhas. Tente novamente.', 'error');
    }
  };

  return (
    <div className="generator-page-container">
      <VideoBackground 
        videoPath="/videos/background.mp4"
        fallbackColors={{
          primary: '#ffffff',
          secondary: '#000000',
          accent: '#808080'
        }}
        onColorsExtracted={(colors) => {
          console.log('[PasswordGenerator] Cores do vídeo extraídas:', colors);
        }}
      />
      <div className="futuristic-background">
        <div className="grid-overlay"></div>
        <div className="floating-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={`particle particle-${i % 3}`}></div>
          ))}
        </div>
      </div>

      <header className="generator-header">
        <button className="back-button" onClick={onBack}>
          <span className="back-icon">←</span>
          <span className="back-text">VOLTAR</span>
        </button>
        <h1 className="generator-title">GERADOR DE SENHAS</h1>
        <div className="header-glow"></div>
      </header>

      <main className="generator-main">
        <div className="generator-card">
          <div className="form-section">
            {/* Botões de Filtro Rápido */}
            <div className="quick-filters">
              <h3 className="options-title">Filtros Rápidos</h3>
              <div className="filter-buttons">
                <button 
                  className="filter-btn"
                  onClick={() => {
                    setIncludeLowercase(true);
                    setIncludeUppercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(true);
                  }}
                >
                  <span className="btn-icon">🔐</span>
                  <span>Completa</span>
                </button>
                
                <button 
                  className="filter-btn"
                  onClick={() => {
                    setIncludeLowercase(true);
                    setIncludeUppercase(true);
                    setIncludeNumbers(true);
                    setIncludeSymbols(false);
                  }}
                >
                  <span className="btn-icon">🔤</span>
                  <span>Alfanumérica</span>
                </button>
                
                <button 
                  className="filter-btn"
                  onClick={() => {
                    setIncludeLowercase(true);
                    setIncludeUppercase(false);
                    setIncludeNumbers(false);
                    setIncludeSymbols(false);
                  }}
                >
                  <span className="btn-icon">abc</span>
                  <span>Só Letras</span>
                </button>
                
                <button 
                  className="filter-btn"
                  onClick={() => {
                    setIncludeLowercase(false);
                    setIncludeUppercase(false);
                    setIncludeNumbers(true);
                    setIncludeSymbols(false);
                  }}
                >
                  <span className="btn-icon">123</span>
                  <span>Só Números</span>
                </button>
                
                <button 
                  className="filter-btn"
                  onClick={() => {
                    setIncludeLowercase(false);
                    setIncludeUppercase(false);
                    setIncludeNumbers(false);
                    setIncludeSymbols(true);
                  }}
                >
                  <span className="btn-icon">!@#</span>
                  <span>Só Símbolos</span>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password-length" className="label">
                Comprimento da senha: <span className="length-display">{length}</span>
              </label>
              <div className="input-with-slider">
                <input
                  type="range"
                  id="password-length"
                  min="4"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="futuristic-slider"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="password-count" className="label">
                Quantidade de senhas:
              </label>
              <input
                type="number"
                id="password-count"
                min="1"
                max="20"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="futuristic-input"
              />
            </div>

            <div className="options-section">
              <h3 className="options-title">Configurações de Caracteres:</h3>
              <div className="checkbox-grid">
                <label className="futuristic-checkbox">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Minúsculas (a-z)</span>
                </label>
                <label className="futuristic-checkbox">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Maiúsculas (A-Z)</span>
                </label>
                <label className="futuristic-checkbox">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Números (0-9)</span>
                </label>
                <label className="futuristic-checkbox">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Símbolos (!@#$...)</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="generate-button"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="button-spinner"></div>
                  <span className="button-text">GERANDO...</span>
                </>
              ) : (
                <>
                  <span className="button-text">GERAR SENHAS</span>
                  <div className="button-glow"></div>
                </>
              )}
            </button>
          </div>

          {passwords.length > 0 && (
            <div className="results-section" ref={passwordsContainerRef}>
              <h3 className="results-title">Senhas Geradas:</h3>
              <div className="passwords-container">
                {passwords.map((password, index) => (
                  <div key={index} className="password-item">
                    <span className="password-text">{password}</span>
                    <button
                      className="copy-button"
                      onClick={() => copyPassword(password)}
                    >
                      <span className="copy-icon">📋</span>
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
              <button className="copy-all-button" onClick={copyAllPasswords}>
                <span className="button-text">Copiar Todas</span>
                <span className="copy-icon">📋</span>
              </button>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3 className="info-title">Dicas de Segurança:</h3>
          <ul className="tips-list">
            <li>Use pelo menos 12 caracteres para maior segurança</li>
            <li>Combine diferentes tipos de caracteres</li>
            <li>Não reutilize senhas entre diferentes contas</li>
            <li>Use um gerenciador de senhas para armazenar com segurança</li>
            <li>Ative autenticação de dois fatores quando possível</li>
          </ul>
        </div>
      </main>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-text">{notification.message}</span>
        </div>
      )}
    </div>
  );
};
