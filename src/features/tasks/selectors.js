import { createSelector } from '@reduxjs/toolkit';

export const selectFilteredAndSortedTasks = createSelector(
  (state) => state.tasks.tasks,
  (state) => state.tasks.searchQuery,
  (state) => state.tasks.sortBy,
  (tasks, searchQuery, sortBy) => {
    let filtered = tasks || [];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title?.toLowerCase().includes(query)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date || 0) - new Date(a.date || 0);
      }
      if (sortBy === 'priority') {
        const order = { high: 0, medium: 1, low: 2 };
        return (order[a.priority] ?? 3) - (order[b.priority] ?? 3);
      }
      return 0;
    });

    return sorted;
  }
);