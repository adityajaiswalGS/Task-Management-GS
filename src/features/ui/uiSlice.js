import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: localStorage.getItem('themeMode') || 'light',

};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', state.themeMode);
    },
  },
  showSnackbar(state, action) {
 
}
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;