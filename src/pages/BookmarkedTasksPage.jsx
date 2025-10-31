import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function BookmarkedTasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, status, error } = useSelector((state) => state.tasks || { tasks: [], status: 'idle', error: null });
  const bookmarkedTasks = tasks.filter((t) => t.bookmarked);

  useEffect(() => {
    dispatch({ type: 'tasks/fetchRequest' });
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bookmarked Tasks
      </Typography>
      {status === 'loading' && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {bookmarkedTasks.length === 0 && <Typography>No bookmarked tasks.</Typography>}
      <List>
        {bookmarkedTasks.map((task) => (
          <ListItem key={task.id} onClick={() => navigate(`/tasks/${task.id}`)} sx={{ cursor: 'pointer' }}>
            <ListItemText primary={task.title} secondary={task.subtitle} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}