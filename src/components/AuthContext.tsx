import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  user: string | null;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('user')
  );

  const signup = (username: string, password: string) => {
    if (localStorage.getItem('user')) {
      return false; // User already exists
    }
    const userData = { username, password };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(username);
    return true;
  };

  const login = (username: string, password: string) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { username: storedUsername, password: storedPassword } = JSON.parse(storedUser);
      if (storedUsername === username && storedPassword === password) {
        setUser(username);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
