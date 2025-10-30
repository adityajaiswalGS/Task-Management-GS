import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    status: 'all',  // 'all' | 'completed' | 'pending'
    priority: null,  // 'low' | 'medium' | 'high' | null
    dueDate: null,   // Date string or null
    search: '',      // For title/subtitle search
  },
  sortBy: 'date',    // 'date' | 'priority'
  pagination: {
    page: 1,
    limit: 5,        // Initial 5 tasks on dashboard
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
      state.status = 'succeeded';
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    loadMore(state) {
    state.pagination.page += 1;
  },
    updateTaskInList(state, action) {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleBookmark(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.bookmarked = !task.bookmarked;
      }
    },
    toggleCompleted(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;  // Reset page on filter change
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTaskInList,
  removeTask,
  toggleBookmark,
  toggleCompleted,
  setFilters,
  setSortBy,
  loadMore,
  setLoading,
  setError,
} = tasksSlice.actions;

export default tasksSlice.reducer;