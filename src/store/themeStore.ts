import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeState } from "../types/types";



export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    {
      name: "theme-storage",
    }
  )
);
