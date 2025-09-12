import React, { useState, useRef } from 'react';

interface IPasswordGeneratorProps {
  onLogout: () => void;
  userName: string;
}

export const PasswordGenerator: React.FC<IPasswordGeneratorProps> = ({
  onLogout,
  userName,
}) => {
  console.log('[PasswordGenerator] Nome do usuário recebido:', userName);
  
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(1);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  console.log('[PasswordGenerator] Estado inicial:', {
    length,
    count,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    passwords: passwords.length,
    isGenerating
  });

  const passwordsContainerRef = useRef<HTMLDivElement>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const generatePassword = (passwordLength: number): string => {
    console.log('[PasswordGenerator:generatePassword] Gerando senha com comprimento:', passwordLength);
    console.log('[PasswordGenerator:generatePassword] Opções selecionadas:', {
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    });
    
    if (passwordLength < 4) {
      throw new Error('O comprimento da senha deve ser de pelo menos 4 caracteres.');
    }

    // Verificar se pelo menos uma opção está selecionada
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
      throw new Error('Selecione pelo menos um tipo de caractere.');
    }

    // Definir os conjuntos de caracteres
    const charSets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    let requiredChars: string[] = [];

    // Adicionar caracteres disponíveis baseado nas opções selecionadas
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

    // Garantir que a senha contenha pelo menos um caractere de cada tipo selecionado
    const password = [...requiredChars];

    // Preencher o restante da senha com caracteres aleatórios
    for (let i = requiredChars.length; i < passwordLength; i++) {
      password.push(getRandomChar(availableChars));
    }

    // Embaralhar a senha para garantir aleatoriedade
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
    console.log('[PasswordGenerator:handleGenerate] Iniciando geração de senhas');
    console.log('[PasswordGenerator:handleGenerate] Configurações:', {
      length,
      count,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    });
    
    try {
      setIsGenerating(true);
      
      const generatedPasswords: string[] = [];
      for (let i = 0; i < count; i++) {
        const password = generatePassword(length);
        generatedPasswords.push(password);
        console.log(`[PasswordGenerator:handleGenerate] Senha ${i + 1} gerada:`, password);
      }

      setPasswords(generatedPasswords);
      console.log('[PasswordGenerator:handleGenerate] Senhas geradas com sucesso:', generatedPasswords);
      
      // Scroll para a seção de resultados
      setTimeout(() => {
        passwordsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('[PasswordGenerator:handleGenerate] Erro ao gerar senhas:', error);
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
    <div className="password-generator-container">
      <header className="generator-header">
        <div className="user-info">
          <h1 className="generator-title">Gerador de Senhas Seguras</h1>
          <p className="welcome-message">Bem-vindo, {userName || 'Usuário'}!</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </header>

      <main className="generator-main">
        <div className="generator-card">
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="password-length" className="label">
                Comprimento da senha:
              </label>
              <div className="input-with-slider">
                <input
                  type="range"
                  id="password-length"
                  min="4"
                  max="50"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="slider"
                />
                <span className="length-display">{length}</span>
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
                className="number-input"
              />
            </div>

            <div className="options-section">
              <h3 className="options-title">Opções de caracteres:</h3>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={(e) => setIncludeLowercase(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Minúsculas (a-z)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={(e) => setIncludeUppercase(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Maiúsculas (A-Z)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Números (0-9)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  Símbolos (!@#$%...)
                </label>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="generate-btn"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="btn-spinner"></span>
                  Gerando...
                </>
              ) : (
                <>
                  <span className="btn-text">Gerar Senhas</span>
                  <span className="btn-icon">🔐</span>
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
                      className="copy-btn"
                      onClick={() => copyPassword(password)}
                    >
                      <span className="btn-icon">📋</span>
                      Copiar
                    </button>
                  </div>
                ))}
              </div>
              <button className="copy-all-btn" onClick={copyAllPasswords}>
                <span className="btn-text">Copiar Todas</span>
                <span className="btn-icon">📋</span>
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
