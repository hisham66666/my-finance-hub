import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Transaction, User } from './types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

interface DataContextType {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const DataContext = createContext<DataContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('finance_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData = { id: found.id, name: found.name, email: found.email };
      setUser(userData);
      localStorage.setItem('finance_user', JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('finance_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    const newUser = { id: crypto.randomUUID(), name, email, password };
    users.push(newUser);
    localStorage.setItem('finance_users', JSON.stringify(users));
    const userData = { id: newUser.id, name, email };
    setUser(userData);
    localStorage.setItem('finance_user', JSON.stringify(userData));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('finance_user');
  }, []);

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const storageKey = `finance_transactions_${user?.id || 'guest'}`;

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  });

  const save = (txns: Transaction[]) => {
    setTransactions(txns);
    localStorage.setItem(storageKey, JSON.stringify(txns));
  };

  const addTransaction = (t: Omit<Transaction, 'id'>) => {
    save([...transactions, { ...t, id: crypto.randomUUID() }]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    save(transactions.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    save(transactions.filter(t => t.id !== id));
  };

  return <DataContext.Provider value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}>{children}</DataContext.Provider>;
};
