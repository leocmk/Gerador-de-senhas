import React, { useRef } from 'react';
import { VideoBackground } from '../shared/VideoBackground';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import type { IPasswordGeneratorProps } from '../types/app.types';

export const PasswordGeneratorPage: React.FC<IPasswordGeneratorProps> = ({
  onBack,
}) => {
  const passwordsContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    length,
    count,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    passwords,
    isGenerating,
    notification,
    history,
    setLength,
    setCount,
    setIncludeLowercase,
    setIncludeUppercase,
    setIncludeNumbers,
    setIncludeSymbols,
    handleGenerate,
    copyPassword,
    copyAllPasswords,
    clearHistory,
    removeFromHistory,
  } = usePasswordGenerator();

  // Scroll para resultados após gerar
  React.useEffect(() => {
    if (passwords.length > 0) {
      setTimeout(() => {
        passwordsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [passwords]);

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

          {history.length > 0 && (
            <div className="history-section">
              <div className="history-header">
                <h3 className="history-title">Histórico de Senhas</h3>
                <button 
                  className="clear-history-button"
                  onClick={clearHistory}
                  title="Limpar todo o histórico"
                >
                  <span className="clear-icon">🗑️</span>
                  Limpar Histórico
                </button>
              </div>
              <div className="history-container">
                {history.slice(0, 20).map((entry) => (
                  <div key={entry.id} className="history-item">
                    <div className="history-content">
                      <span className="history-password">{entry.password}</span>
                      <div className="history-meta">
                        <span className="history-timestamp">
                          {entry.timestamp.toLocaleString('pt-BR')}
                        </span>
                        <span className="history-length">
                          {entry.length} caracteres
                        </span>
                        <div className="history-settings">
                          {entry.settings.includeLowercase && <span className="setting-tag">a-z</span>}
                          {entry.settings.includeUppercase && <span className="setting-tag">A-Z</span>}
                          {entry.settings.includeNumbers && <span className="setting-tag">0-9</span>}
                          {entry.settings.includeSymbols && <span className="setting-tag">!@#</span>}
                        </div>
                      </div>
                    </div>
                    <div className="history-actions">
                      <button
                        className="history-copy-button"
                        onClick={() => copyPassword(entry.password)}
                        title="Copiar senha"
                      >
                        <span className="copy-icon">📋</span>
                      </button>
                      <button
                        className="history-remove-button"
                        onClick={() => removeFromHistory(entry.id)}
                        title="Remover do histórico"
                      >
                        <span className="remove-icon">❌</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {history.length > 20 && (
                <div className="history-more">
                  <span>Mostrando 20 de {history.length} entradas</span>
                </div>
              )}
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
