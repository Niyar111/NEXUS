import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../utils/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedToken = localStorage.getItem('nexus_token');
    const savedUser = localStorage.getItem('nexus_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login – replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    const fakeToken = 'mock-jwt-token-' + Date.now();
    const userData = { ...mockUser, email };
    setToken(fakeToken);
    setUser(userData);
    localStorage.setItem('nexus_token', fakeToken);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    // Mock register – replace with real API call
    await new Promise((r) => setTimeout(r, 1000));
    const fakeToken = 'mock-jwt-token-' + Date.now();
    const userData = { ...mockUser, name, email };
    setToken(fakeToken);
    setUser(userData);
    localStorage.setItem('nexus_token', fakeToken);
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nexus_token');
    localStorage.removeItem('nexus_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('nexus_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
