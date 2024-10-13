import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  logIn: (user: string) => void;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  logIn: (user) => set({ isLoggedIn: true, user }),
  logOut: () => set({ isLoggedIn: false, user: null }),
}));
