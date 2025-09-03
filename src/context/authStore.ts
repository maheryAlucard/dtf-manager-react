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
  // Placeholder for IPC service interaction
  // You would typically have an authService that interacts with ipcRenderer
  // For now, these actions will be simplified.
  // Placeholder for IPC service interaction
  // You would typically have an authService that interacts with ipcRenderer
  // For now, these actions will be simplified.
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, passwordHash: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call for login
      await new Promise(resolve => setTimeout(resolve, 500));
      if (email === 'admin@example.com' && passwordHash === 'password') {
        const loggedInUser: User = {
          id: 'U001',
          name: 'Admin User',
          roleId: 'admin', // Assuming roleId is part of User type
          email: email,
          phone: null, // Added missing phone property
          passwordHash: passwordHash,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({ user: loggedInUser, isAuthenticated: true, isLoading: false });
        return true;
      }
      set({ error: 'Invalid credentials', isLoading: false });
      return false;
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
}));