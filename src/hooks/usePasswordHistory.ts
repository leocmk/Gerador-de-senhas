import { useState, useCallback } from 'react';
import type { IPasswordHistoryEntry } from '../types/app.types';

const HISTORY_STORAGE_KEY = 'password-generator-history';
const MAX_HISTORY_ENTRIES = 100;

export const usePasswordHistory = () => {
  const [history, setHistory] = useState<IPasswordHistoryEntry[]>(() => {
    try {
      const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Converter timestamps de string para Date
        return parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
      }
    } catch (error) {
      console.error('[usePasswordHistory] Erro ao carregar histórico do localStorage:', error);
    }
    return [];
  });

  const addToHistory = useCallback((password: string, settings: {
    length: number;
    includeLowercase: boolean;
    includeUppercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
  }): void => {
    const newEntry: IPasswordHistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      password,
      timestamp: new Date(),
      length: settings.length,
      settings: {
        includeLowercase: settings.includeLowercase,
        includeUppercase: settings.includeUppercase,
        includeNumbers: settings.includeNumbers,
        includeSymbols: settings.includeSymbols,
      },
    };

    setHistory(prevHistory => {
      const updatedHistory = [newEntry, ...prevHistory].slice(0, MAX_HISTORY_ENTRIES);
      
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('[usePasswordHistory] Erro ao salvar histórico no localStorage:', error);
      }
      
      return updatedHistory;
    });
  }, []);

  const clearHistory = useCallback((): void => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error('[usePasswordHistory] Erro ao limpar histórico do localStorage:', error);
    }
  }, []);

  const removeFromHistory = useCallback((id: string): void => {
    setHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(entry => entry.id !== id);
      
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error('[usePasswordHistory] Erro ao salvar histórico no localStorage:', error);
      }
      
      return updatedHistory;
    });
  }, []);

  const getHistoryByDate = useCallback((date: Date): IPasswordHistoryEntry[] => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return history.filter(entry => 
      entry.timestamp >= startOfDay && entry.timestamp <= endOfDay
    );
  }, [history]);

  const getRecentHistory = useCallback((limit: number = 10): IPasswordHistoryEntry[] => {
    return history.slice(0, limit);
  }, [history]);

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    getHistoryByDate,
    getRecentHistory,
  };
};
