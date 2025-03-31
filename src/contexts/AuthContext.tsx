
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, otp: string) => Promise<void>;
  sendOtp: (email: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state on component mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const sendOtp = async (email: string) => {
    // Simulate sending OTP
    console.log(`OTP sent to ${email}`);
    // In a real app, this would call your backend API
    return Promise.resolve();
  };

  const login = async (email: string, otp: string) => {
    // Simulate login
    setIsLoading(true);
    
    // This is a mock implementation - in a real app, you would verify the OTP with your backend
    const mockUser = {
      id: '1',
      name: 'Test User',
      email,
      isAdmin: email.includes('admin'),
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = async (name: string, email: string) => {
    // Simulate registration
    setIsLoading(true);
    
    // This is a mock implementation - in a real app, you would register the user with your backend
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // After registration, we would typically send an OTP for verification
    await sendOtp(email);
    
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      sendOtp,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};
