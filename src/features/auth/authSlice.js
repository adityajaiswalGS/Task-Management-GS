import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      state.loginSuccess = true; 
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    clearLoginSuccess(state) {
  state.loginSuccess = false;  // ← reset
},
  },
});

export const { loginSuccess, logout , clearLoginSuccess,} = authSlice.actions;
export default authSlice.reducer;  // ← This is critical