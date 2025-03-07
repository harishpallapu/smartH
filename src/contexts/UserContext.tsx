
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface User {
  name: string;
  email: string;
  memberSince: string;
  height: string;
  weight: string;
  bmi: number;
  age: number;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('smartHealthUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, we'll allow any login but set the correct user data
      const userData: User = {
        name: email.includes('demo') ? 'Demo User' : email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        memberSince: 'January 2023',
        height: '175 cm',
        weight: '68.2 kg',
        bmi: 22.3,
        age: 32
      };

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('smartHealthUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, create a user based on the registration information
      const userData: User = {
        name: name,
        email: email,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        height: '175 cm',
        weight: '68.2 kg',
        bmi: 22.3,
        age: 32
      };

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('smartHealthUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('smartHealthUser');
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
