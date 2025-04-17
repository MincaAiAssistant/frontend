import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, AuthResponse } from './types';
import { apiRequest } from './queryClient';

const BASE_URL = import.meta.env.VITE_BASE_URL;

type AuthStore = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await apiRequest('POST', `${BASE_URL}/auth/login`, {
            email,
            password,
          });

          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message || 'Login failed');
          }

          const data: AuthResponse = await response.json();

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (username, email, password) => {
        set({ isLoading: true });
        try {
          const response = await apiRequest('POST', `${BASE_URL}/auth/signup`, {
            username,
            email,
            password,
          });

          if (!response.ok) {
            const { message } = await response.json();
            throw new Error(message || 'Registration failed');
          }

          const data: AuthResponse = await response.json();

          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('token');
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);
