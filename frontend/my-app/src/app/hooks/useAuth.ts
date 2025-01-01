import { create } from "zustand";
import AuthService from "../services/auth/auth.service";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.login({ email, password });
      set({
        user: response.user,
        isAuthenticated: true,
      });
    } catch (err: any) {
      set({
        error: err.message || "Login failed. Please check your credentials.",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await AuthService.signup(data);
      set({
        user: response.user,
        isAuthenticated: true,
      });
    } catch (err: any) {
      set({
        error: err.message || "Signup failed. Please try again.",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    AuthService.logout();
    set({ user: null, isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));

export default useAuth;
