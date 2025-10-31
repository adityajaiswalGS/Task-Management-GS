import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice'; 
import uiReducer from '../features/ui/uiSlice' // ← Confirm path & import

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  ui: uiReducer  // ← This maps to state.tasks
});

export default rootReducer;