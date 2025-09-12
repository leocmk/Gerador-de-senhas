import React, { useState } from 'react';
import { ILoginCredentials } from '../types/auth.types';

interface ILoginFormProps {
  onLogin: (credentials: ILoginCredentials) => Promise<void>;
  onSwitchToRegister: () => void;
  onSwitchToForgotPassword: () => void;
  isLoading: boolean;
}

export const LoginForm: React.FC<ILoginFormProps> = ({
  onLogin,
  onSwitchToRegister,
  onSwitchToForgotPassword,
  isLoading,
}) => {
  const [formData, setFormData] = useState<ILoginCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<ILoginCredentials>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name as keyof ILoginCredentials]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ILoginCredentials> = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onLogin(formData);
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <h2 className="auth-form-title">Entrar</h2>
        <p className="auth-form-subtitle">Acesse sua conta para gerar senhas seguras</p>
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
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            placeholder="seu@email.com"
            disabled={isLoading}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input ${errors.password ? 'form-input-error' : ''}`}
            placeholder="Sua senha"
            disabled={isLoading}
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <button
          type="button"
          className="forgot-password-link"
          onClick={onSwitchToForgotPassword}
          disabled={isLoading}
        >
          Esqueceu sua senha?
        </button>

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="btn-spinner"></span>
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </button>
      </form>

      <div className="auth-form-footer">
        <p>
          Não tem uma conta?{' '}
          <button
            type="button"
            className="auth-switch-link"
            onClick={onSwitchToRegister}
            disabled={isLoading}
          >
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};
