import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const initialState = {
  tasks: [],
  status: 'idle',              
  error: null,
  filters: {
    status: 'all',
    priority: null,
    dueDate: null,
    search: '',
  },
  pagination: { page: 1, limit: 5 },

  searchQuery: '',
  sortBy: 'date',             
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
    updateTaskInList(state, action) {
      const idx = state.tasks.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) state.tasks[idx] = action.payload;
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
    toggleBookmark(state, action) {
      const t = state.tasks.find(t => t.id === action.payload);
      if (t) t.bookmarked = !t.bookmarked;
    },

    

toggleBookmarkSuccess(state, action) {
  const task = state.tasks.find(t => t.id === action.payload.id);
  if (task) {
    task.bookmarked = action.payload.bookmarked;
  }
},
    toggleCompleted(state, action) {
      const t = state.tasks.find(t => t.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    createSuccess(state) { state.createSuccess = true; },
    updateSuccess(state) { state.updateSuccess = true; },
    deleteSuccess(state) { state.deleteSuccess = true; },
    resetNotifications(state) {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.pagination.page = 1;          
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.pagination.page = 1;          
    },

    loadMore(state) {
      state.pagination.page += 1;
    },
    optimisticBookmark(state, action) {
  const task = state.tasks.find(t => t.id === action.payload);
  if (task) task.bookmarked = !task.bookmarked;
},
  },

 extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.tasks = [];
      state.status = 'idle';
      state.pagination.page = 1;
    });
  },
});




export const {
  setTasks,
  addTask,
  updateTaskInList,
  optimisticBookmark,
  removeTask,
  toggleBookmark,
  toggleBookmarkSuccess,   
  toggleCompleted,
  setFilters,
  setLoading,
  setError,
  createSuccess,
  updateSuccess,
  deleteSuccess,
  resetNotifications,
  setSearchQuery,
  setSortBy,
  loadMore,
} = tasksSlice.actions;
export default tasksSlice.reducer;