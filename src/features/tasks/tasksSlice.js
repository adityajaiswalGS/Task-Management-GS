import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  status: 'idle',               // idle | loading | succeeded | failed
  error: null,
  filters: {
    status: 'all',
    priority: null,
    dueDate: null,
    search: '',
  },
  pagination: { page: 1, limit: 5 },

  searchQuery: '',
  sortBy: 'date',               // 'date' | 'priority'
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

    // ---- notification flags ----
    createSuccess(state) { state.createSuccess = true; },
    updateSuccess(state) { state.updateSuccess = true; },
    deleteSuccess(state) { state.deleteSuccess = true; },
    resetNotifications(state) {
      state.createSuccess = false;
      state.updateSuccess = false;
      state.deleteSuccess = false;
    },

    // ---- search & sort ----
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.pagination.page = 1;          // reset page on new search
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      state.pagination.page = 1;          // reset page on new sort
    },

    loadMore(state) {
      state.pagination.page += 1;
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