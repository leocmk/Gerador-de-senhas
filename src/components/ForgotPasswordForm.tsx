import React, { useState } from 'react';
import { ResetPasswordToken } from './ResetPasswordToken';

interface IForgotPasswordFormProps {
  onRequestReset: (email: string) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

export const ForgotPasswordForm: React.FC<IForgotPasswordFormProps> = ({
  onRequestReset,
  onSwitchToLogin,
  isLoading,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (error) {
      setError('');
    }
  };

  const validateEmail = (): boolean => {
    if (!email) {
      setError('Email é obrigatório');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email inválido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    await onRequestReset(email);
    
    // Gerar token simulado para demonstração
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setResetToken(token);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <>
        <div className="auth-form-container">
          <div className="auth-form-header">
            <div className="success-icon">✓</div>
            <h2 className="auth-form-title">Email enviado!</h2>
            <p className="auth-form-subtitle">
              Enviamos um link de recuperação para <strong>{email}</strong>
            </p>
          </div>

          <div className="success-message">
            <p>
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              O link expira em 1 hora.
            </p>
            <p>
              <strong>Modo Demo:</strong> Clique no botão abaixo para ver o token simulado.
            </p>
          </div>

          <div className="demo-actions">
            <button
              type="button"
              className="show-token-btn"
              onClick={() => setResetToken(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))}
            >
              📧 Ver Token Simulado
            </button>
          </div>

          <div className="auth-form-footer">
            <button
              type="button"
              className="auth-switch-link"
              onClick={onSwitchToLogin}
            >
              Voltar ao login
            </button>
          </div>
        </div>

        {resetToken && (
          <ResetPasswordToken
            token={resetToken}
            email={email}
            onClose={() => setResetToken(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Recuperar senha</h2>
        <p className="auth-form-subtitle">
          Digite seu email para receber um link de recuperação
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className={`form-input ${error ? 'form-input-error' : ''}`}
            placeholder="seu@email.com"
            disabled={isLoading}
          />
          {error && <span className="form-error">{error}</span>}
        </div>

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner"></span>
              Enviando...
            </>
          ) : (
            'Enviar link de recuperação'
          )}
        </button>
      </form>

      <div className="auth-form-footer">
        <p>
          Lembrou da senha?{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};
