import { create } from 'zustand';
import type { User } from '../db/schema';

// Define the state interface for the auth store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, passwordHash: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, passwordHash: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: passwordHash }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        set({ user: data.user, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        set({ error: data.message || 'Login failed', isLoading: false });
        return false;
      }
    } catch (err: any) {
      set({ error: (err as Error).message || 'Login failed', isLoading: false });
      return false;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        set({ user: data.user, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        set({ error: data.message || 'Registration failed', isLoading: false });
        return false;
      }
    } catch (err: any) {
      set({ error: (err as Error).message || 'Registration failed', isLoading: false });
      return false;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: data.message || 'Failed to send reset link', isLoading: false });
        return false;
      }
    } catch (err: any) {
      set({ error: (err as Error).message || 'Failed to send reset link', isLoading: false });
      return false;
    }
  },

  resetPassword: async (token: string, newPassword: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('http://localhost:3001/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        set({ isLoading: false });
        return true;
      } else {
        set({ error: data.message || 'Failed to reset password', isLoading: false });
        return false;
      }
    } catch (err: any) {
      set({ error: (err as Error).message || 'Failed to reset password', isLoading: false });
      return false;
    }
  },
}));