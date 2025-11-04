import { createSlice } from '@reduxjs/toolkit';
import { isTokenValid } from '../../utils/fakeJWT';

const loadAuthState = () => {
  const token = localStorage.getItem('token');
  if (token && isTokenValid(token)) {
    return {
      token,
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      isAuthenticated: true,
      loginSuccess: false,
    };
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
    loginSuccess: false,
  };
};

const initialState = loadAuthState();  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loginSuccess = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loginSuccess = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearLoginSuccess(state) {
      state.loginSuccess = false;
    },
  },
});

export const { loginSuccess, logout, clearLoginSuccess } = authSlice.actions;
export default authSlice.reducer;