declare module '@/utils/auth' {
  export function isAuthenticated(): boolean;
  export function getToken(): string | null;
} 