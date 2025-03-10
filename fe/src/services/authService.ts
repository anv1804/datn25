import axios from 'axios';
import { AuthResponse, LoginData, RegisterData } from '@/types/index';

const API_URL = 'http://localhost:5000/api/auth';

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Registration failed. Please try again later.');
  }
};

export const login = async (userData: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Login failed. Please try again later.');
  }
};

export const logoutService = async (token?: string): Promise<void> => {
  try {
    // If your backend requires a logout API call, uncomment this
    // if (token) {
    //   await axios.post(`${API_URL}/logout`, {}, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }
    
    // For now, we'll just handle the logout on the client side
    return Promise.resolve();
  } catch (error) {
    console.error('Logout error:', error);
    // Even if the API call fails, we still want to log out on the client side
    return Promise.resolve();
  }
}; 