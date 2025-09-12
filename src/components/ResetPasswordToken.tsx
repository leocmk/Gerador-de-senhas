import React, { useState } from 'react';

interface IResetPasswordTokenProps {
  token: string;
  email: string;
  onClose: () => void;
}

export const ResetPasswordToken: React.FC<IResetPasswordTokenProps> = ({
  token,
  email,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToken = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar token:', error);
    }
  };

  const copyLink = async (): Promise<void> => {
    try {
      const link = `http://localhost:3000/reset-password?token=${token}`;
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar link:', error);
    }
  };

  return (
    <div className="reset-token-modal">
      <div className="reset-token-content">
        <div className="reset-token-header">
          <h3>📧 Email de Recuperação Simulado</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="reset-token-body">
          <p><strong>Para:</strong> {email}</p>
          <p><strong>Assunto:</strong> Redefinição de senha - Gerador de Senhas Seguras</p>
          
          <div className="token-section">
            <h4>Token de Reset:</h4>
            <div className="token-display">
              <code className="token-code">{token}</code>
              <button 
                className={`copy-token-btn ${copied ? 'copied' : ''}`}
                onClick={copyToken}
              >
                {copied ? '✓ Copiado!' : '📋 Copiar Token'}
              </button>
            </div>
          </div>
          
          <div className="link-section">
            <h4>Link de Reset:</h4>
            <div className="link-display">
              <code className="reset-link">
                http://localhost:3000/reset-password?token={token}
              </code>
              <button 
                className={`copy-link-btn ${copied ? 'copied' : ''}`}
                onClick={copyLink}
              >
                {copied ? '✓ Copiado!' : '🔗 Copiar Link'}
              </button>
            </div>
          </div>
          
          <div className="instructions">
            <h4>Instruções:</h4>
            <ol>
              <li>Copie o token ou link acima</li>
              <li>Em um cenário real, isso seria enviado por email</li>
              <li>Use o token para redefinir sua senha</li>
            </ol>
          </div>
        </div>
        
        <div className="reset-token-footer">
          <button className="close-modal-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
