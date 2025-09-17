import React, { useState, useEffect } from 'react';
import { PasswordGeneratorPage } from './PasswordGeneratorPage';
import { VideoBackground } from '../components/VideoBackground';

export const LandingPage: React.FC = () => {
  const [showGenerator, setShowGenerator] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (showGenerator) {
    return <PasswordGeneratorPage onBack={() => setShowGenerator(false)} />;
  }

  return (
    <div className="landing-container">
      <VideoBackground 
        videoPath="/videos/background.mp4"
        fallbackColors={{
          primary: '#ffffff',
          secondary: '#000000',
          accent: '#808080'
        }}
        onColorsExtracted={(colors) => {
          console.log('[LandingPage] Cores do vídeo extraídas:', colors);
        }}
      />
      <div className="futuristic-background">
        <div className="grid-overlay"></div>
        <div className="floating-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`particle particle-${i % 4}`}></div>
          ))}
        </div>
        <div className="energy-waves">
          <div className={`wave wave-1 phase-${animationPhase}`}></div>
          <div className={`wave wave-2 phase-${animationPhase}`}></div>
          <div className={`wave wave-3 phase-${animationPhase}`}></div>
        </div>
        <div className="neon-grid">
          <div className="grid-line horizontal"></div>
          <div className="grid-line horizontal"></div>
          <div className="grid-line horizontal"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
        </div>
      </div>

      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">
            Gerador de Senhas Seguras
          </h1>
          
          <p className="hero-subtitle">
            Crie senhas ultra-seguras com tecnologia de ponta
          </p>

          <button 
            className="cta-button"
            onClick={() => setShowGenerator(true)}
          >
            <span className="button-text">INICIAR GERAÇÃO</span>
            <div className="button-glow"></div>
            <div className="button-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </button>
        </div>

        <div className="tech-features">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <span>Algoritmo Avançado</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <span>Máxima Segurança</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚀</div>
            <span>Interface Futurista</span>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">256</div>
            <div className="stat-label">Bits de Entropia</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Combinações Possíveis</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">0.001s</div>
            <div className="stat-label">Tempo de Geração</div>
          </div>
        </div>
      </div>

      <div className="bottom-glow"></div>
    </div>
  );
};
