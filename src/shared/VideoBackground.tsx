import React, { useRef, useEffect, useState } from 'react';
import type { IVideoBackgroundProps, IColorPalette } from '../types/app.types';

export const VideoBackground: React.FC<IVideoBackgroundProps> = ({
  videoPath = '/videos/background.mp4',
  fallbackColors = {
    primary: '#8b5cf6',
    secondary: '#f59e0b',
    accent: '#a855f7'
  },
  onColorsExtracted
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  
  const colors = null as any;
  const isLoading = false;
  const error = null;

  // Aplicar cores extraídas ao CSS
  useEffect(() => {
    if (colors && onColorsExtracted) {
      onColorsExtracted(colors);
    }

    if (colors) {
      const root = document.documentElement;
      root.style.setProperty('--video-primary', colors.primary);
      root.style.setProperty('--video-secondary', colors.secondary);
      root.style.setProperty('--video-accent', colors.accent);
      root.style.setProperty('--video-dominant', colors.dominant);
      root.style.setProperty('--video-complementary', colors.complementary);
    }
  }, [colors, onColorsExtracted]);

  // Aplicar cores de fallback se não houver vídeo
  useEffect(() => {
    if (!videoLoaded && !isLoading) {
      const root = document.documentElement;
      root.style.setProperty('--video-primary', fallbackColors.primary);
      root.style.setProperty('--video-secondary', fallbackColors.secondary);
      root.style.setProperty('--video-accent', fallbackColors.accent);
    }
  }, [videoLoaded, isLoading, fallbackColors]);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setVideoError(null);
  };

  const handleVideoError = () => {
    setVideoError('Erro ao carregar vídeo');
    setVideoLoaded(false);
  };

  return (
    <div className="video-background-container">
      {/* Vídeo de fundo */}
            <video
              ref={videoRef}
              className="video-background"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              // @ts-ignore
              playbackRate={1.5}
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              onEnded={() => {
                // Garantir que o vídeo reinicie
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  videoRef.current.play();
                }
              }}
            >
        <source src={videoPath} type="video/mp4" />
        <source src={videoPath.replace('.mp4', '.webm')} type="video/webm" />
        <source src={videoPath.replace('.mp4', '.mov')} type="video/quicktime" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Overlay com gradiente baseado nas cores do vídeo */}
      <div 
        className="video-overlay"
        style={{
          background: colors ? 
            `linear-gradient(135deg, 
              ${colors.primary}15 0%, 
              ${colors.secondary}15 50%, 
              ${colors.accent}15 100%
            )` : 
            `linear-gradient(135deg, 
              ${fallbackColors.primary}15 0%, 
              ${fallbackColors.secondary}15 50%, 
              ${fallbackColors.accent}15 100%
            )`
        }}
      />

      {/* Efeitos de partículas baseados nas cores */}
      <div className="video-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="video-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              backgroundColor: colors ? colors.accent : fallbackColors.accent,
              boxShadow: colors ? 
                `0 0 20px ${colors.accent}40` : 
                `0 0 20px ${fallbackColors.accent}40`
            }}
          />
        ))}
      </div>

      {/* Grid overlay com cores do vídeo */}
      <div 
        className="video-grid"
        style={{
          backgroundImage: colors ?
            `linear-gradient(${colors.primary}20 1px, transparent 1px),
             linear-gradient(90deg, ${colors.primary}20 1px, transparent 1px)` :
            `linear-gradient(${fallbackColors.primary}20 1px, transparent 1px),
             linear-gradient(90deg, ${fallbackColors.primary}20 1px, transparent 1px)`
        }}
      />

      {/* Indicador de carregamento */}
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner" />
          <span>Analisando cores do vídeo...</span>
        </div>
      )}

      {/* Indicador de erro */}
      {videoError && (
        <div className="video-error">
          <span>⚠️ Vídeo não encontrado</span>
          <p>Usando cores padrão</p>
        </div>
      )}

      {/* Debug info removido para simplificar */}
    </div>
  );
};
