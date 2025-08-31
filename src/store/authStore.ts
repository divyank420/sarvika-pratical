import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "../types/types";


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
