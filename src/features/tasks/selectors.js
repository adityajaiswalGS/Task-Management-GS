// src/features/tasks/selectors.js
import { createSelector } from '@reduxjs/toolkit';

const selectTasksState = (state) => state.tasks;


export const selectFilteredAndSortedTasks = createSelector(
  [selectTasksState],
  (tasksState) => {
    let tasks = [...tasksState.tasks];


    if (tasksState.searchQuery) {
      const query = tasksState.searchQuery.toLowerCase();
      tasks = tasks.filter(t =>
        t.title?.toLowerCase().includes(query) ||
        t.subtitle?.toLowerCase().includes(query)
      );
    }

    // Sort by Priority wala partt
    if (tasksState.sortBy === 'priority') {
      tasks.sort((a, b) => (b.priority ?? 3) - (a.priority ?? 3));  // High → Low
    }

    if (tasksState.sortBy === 'date') {
      tasks.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
    }

    return tasks;
  }
);


// Pagination  parttt
export const selectPaginatedTasks = createSelector(
  [selectFilteredAndSortedTasks, selectTasksState],
  (filteredTasks, tasksState) => {
    const { page, limit } = tasksState.pagination;
    const end = page * limit;
    return filteredTasks.slice(0, end);
  }
);