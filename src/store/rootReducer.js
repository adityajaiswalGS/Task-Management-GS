import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';  // ← Confirm path & import

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,  // ← This maps to state.tasks
});

export default rootReducer;