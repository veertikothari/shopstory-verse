
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserProfile } from './types';

export const loginUser = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Handle the "Email not confirmed" error specifically
      if (error.message.includes('Email not confirmed')) {
        // Send a new confirmation email
        await supabase.auth.resend({
          type: 'signup',
          email: email,
        });
        
        toast.error('Please confirm your email', {
          description: 'A confirmation email has been sent. Please check your inbox.'
        });
      } else {
        toast.error('Login failed', {
          description: error.message
        });
      }
      throw error;
    }

    toast.success('Login successful');
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signUpUser = async (
  email: string, 
  password: string, 
  data?: { first_name?: string, last_name?: string }
) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: data?.first_name || '',
          last_name: data?.last_name || '',
        },
      },
    });

    if (error) {
      toast.error('Registration failed', {
        description: error.message
      });
      throw error;
    }

    toast.success('Registration successful', {
      description: 'Please check your email for a confirmation link.'
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Logout failed', {
        description: error.message
      });
      throw error;
    }
    
    toast.success('Logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        postal_code: data.postal_code,
        country: data.country,
        updated_at: new Date().toISOString(), // Fix: Convert Date to string
      })
      .eq('id', userId);

    if (error) {
      toast.error('Failed to update profile', {
        description: error.message
      });
      throw error;
    }

    toast.success('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    if (data) {
      return {
        id: data.id,
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        email: '', // This will be populated by the caller
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        postal_code: data.postal_code || '',
        country: data.country || '',
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};
