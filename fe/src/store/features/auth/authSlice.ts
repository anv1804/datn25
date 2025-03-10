import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User, AuthState } from '@/types/index';
import { logoutService } from '@/services/authService';

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token')
};

// Async thunk for logout
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { getState }) => {
    const state = getState() as { auth: AuthState };
    await logoutService(state.auth.token || undefined);
    return;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => 
  state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token; 