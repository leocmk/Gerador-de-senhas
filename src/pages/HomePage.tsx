import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.mock';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import { PasswordGenerator } from '../components/PasswordGenerator.mock';
import { ILoginCredentials, IRegisterCredentials } from '../types/auth.types';

type AuthView = 'login' | 'register' | 'forgot-password';

export const HomePage: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, register, requestPasswordReset, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogin = async (credentials: ILoginCredentials): Promise<void> => {
    console.log('[HomePage:handleLogin] Processando login');
    const result = await login(credentials);
    
    if (result.success) {
      showNotification(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleRegister = async (credentials: IRegisterCredentials): Promise<void> => {
    console.log('[HomePage:handleRegister] Processando cadastro');
    const result = await register(credentials);
    
    if (result.success) {
      showNotification(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleForgotPassword = async (email: string): Promise<void> => {
    console.log('[HomePage:handleForgotPassword] Processando recuperação de senha');
    const result = await requestPasswordReset(email);
    
    if (result.success) {
      showNotification(result.message);
    } else {
      showNotification(result.message, 'error');
    }
  };

  const handleLogout = (): void => {
    console.log('[HomePage:handleLogout] Processando logout');
    logout();
    setCurrentView('login');
    showNotification('Logout realizado com sucesso!');
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return <PasswordGenerator onLogout={handleLogout} userName={user.name} />;
  }

  return (
    <div className="home-container">
      <div className="home-background">
        <div className="background-pattern"></div>
      </div>

      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">Gerador de Senhas Seguras</h1>
          <p className="home-subtitle">
            Crie senhas fortes e seguras para proteger suas contas online
          </p>
        </div>

        <div className="auth-container">
          {currentView === 'login' && (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setCurrentView('register')}
              onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
              isLoading={isLoading}
            />
          )}

          {currentView === 'register' && (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setCurrentView('login')}
              isLoading={isLoading}
            />
          )}

          {currentView === 'forgot-password' && (
            <ForgotPasswordForm
              onRequestReset={handleForgotPassword}
              onSwitchToLogin={() => setCurrentView('login')}
              isLoading={isLoading}
            />
          )}
        </div>

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3 className="feature-title">Senhas Seguras</h3>
            <p className="feature-description">
              Gere senhas complexas com diferentes tipos de caracteres
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Rápido e Fácil</h3>
            <p className="feature-description">
              Interface intuitiva para gerar senhas em segundos
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">Proteção Total</h3>
            <p className="feature-description">
              Mantenha suas contas protegidas com senhas únicas
            </p>
          </div>
        </div>
      </div>

      {notification && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-text">{notification.message}</span>
        </div>
      )}
    </div>
  );
};
