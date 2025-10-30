import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadMore } from '../features/tasks/tasksSlice';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@mui/material';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Safe selector with fallbacks
  const tasksState = useSelector((state) => state.tasks || {});
  const { tasks = [], status = 'idle', error = null, pagination = { page: 1, limit: 5 } } = tasksState;

  useEffect(() => {
    dispatch({ type: 'tasks/fetchRequest' });
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const visibleTasks = tasks.slice(0, pagination.page * pagination.limit) || [];  // Extra fallback to array

  const handleLogout = () => {
    dispatch({ type: 'auth/logoutRequest' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography>
      <Button variant="outlined" onClick={handleLogout} sx={{ mb: 2 }}>
        Logout
      </Button>

      <Typography variant="h6" gutterBottom>
        Your Tasks
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {error && <Typography color="error">Error: {error}</Typography>}
      {status === 'idle' && <Typography>Loading tasks...</Typography>}
      {status === 'succeeded' && tasks.length === 0 && <Typography>No tasks yet.</Typography>}

      {status === 'succeeded' && Array.isArray(visibleTasks) && (
        <List>
          {visibleTasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.title || 'Untitled'}
                secondary={`${task.subtitle || 'No description'} - Priority: ${task.priority || 'N/A'} - Due: ${task.date || 'No date'}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      {status === 'succeeded' && visibleTasks.length < tasks.length && (
        <Button onClick={() => dispatch(loadMore())}>Load More</Button>
      )}
    </Box>
  );
}