
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType, UserProfile } from './types';
import { loginUser, signUpUser, logoutUser, updateUserProfile, fetchUserProfile } from './authOperations';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession?.user) {
          // Defer fetching profile to avoid auth recursion
          setTimeout(() => {
            handleFetchUserProfile(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setIsAdmin(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        handleFetchUserProfile(currentSession.user.id);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleFetchUserProfile = async (userId: string) => {
    const profileData = await fetchUserProfile(userId);
    
    if (profileData) {
      // Add the email from user
      const updatedProfile = {
        ...profileData,
        email: user?.email || '',
      };
      
      setProfile(updatedProfile);
      
      // Set admin status for specific email
      setIsAdmin(user?.email === 'shahhenil2004@gmail.com');
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginUser(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, data?: { first_name?: string, last_name?: string }) => {
    setIsLoading(true);
    try {
      await signUpUser(email, password, data);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    try {
      await updateUserProfile(user.id, data);
      
      // Update the local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error) {
      // Error is already handled in updateUserProfile
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      isAuthenticated: !!user,
      isLoading,
      isAdmin,
      login,
      signUp,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
