import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: localStorage.getItem('themeMode') || 'light',
  // Add more preferences later (e.g., last filters)
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
  // But since Saga can't call enqueue, dispatch a Redux action and handle in component.
}
});

export const { toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;