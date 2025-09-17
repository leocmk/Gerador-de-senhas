import { useState } from 'react';
import { generatePassword } from '../lib/password.utils';
import type { INotification } from '../types/app.types';

export const usePasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [count, setCount] = useState(1);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<INotification | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success'): void => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleGenerate = async (): Promise<void> => {
    try {
      setIsGenerating(true);

      const generatedPasswords: string[] = [];
      for (let i = 0; i < count; i++) {
        const password = generatePassword(length, {
          includeLowercase,
          includeUppercase,
          includeNumbers,
          includeSymbols,
        });
        generatedPasswords.push(password);
      }

      setPasswords(generatedPasswords);
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
      console.error('[usePasswordGenerator:copyPassword] Erro ao copiar senha:', error);
      showNotification('Erro ao copiar senha. Tente novamente.', 'error');
    }
  };

  const copyAllPasswords = async (): Promise<void> => {
    try {
      const allPasswordsText = passwords.join('\n');
      await navigator.clipboard.writeText(allPasswordsText);
      showNotification(`${passwords.length} senhas copiadas para a área de transferência!`);
    } catch (error) {
      console.error('[usePasswordGenerator:copyAllPasswords] Erro ao copiar senhas:', error);
      showNotification('Erro ao copiar senhas. Tente novamente.', 'error');
    }
  };

  return {
    // State
    length,
    count,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    passwords,
    isGenerating,
    notification,
    
    // Setters
    setLength,
    setCount,
    setIncludeLowercase,
    setIncludeUppercase,
    setIncludeNumbers,
    setIncludeSymbols,
    
    // Actions
    handleGenerate,
    copyPassword,
    copyAllPasswords,
    showNotification,
  };
};
