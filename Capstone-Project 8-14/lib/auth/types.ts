export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  createdAt: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};