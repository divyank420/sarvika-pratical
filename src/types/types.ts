import type { ReactNode } from "react";

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export type Theme = "light" | "dark";

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}


