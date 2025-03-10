import { User } from './user.types';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
} 