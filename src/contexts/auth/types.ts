
import { Session, User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, data?: { first_name?: string, last_name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}
