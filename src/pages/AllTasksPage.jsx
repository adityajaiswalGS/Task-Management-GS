import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export default function AllTasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, status, error } = useSelector((state) => state.tasks || { tasks: [], status: 'idle', error: null });

  useEffect(() => {
    dispatch({ type: 'tasks/fetchRequest' });
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch({ type: 'tasks/deleteRequest', payload: id });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        All Tasks
      </Typography>
      {status === 'loading' && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {tasks.length === 0 && <Typography>No tasks.</Typography>}
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.title}
              secondary={`${task.subtitle} - Priority: ${task.priority}`}
              onClick={() => navigate(`/tasks/${task.id}`)}
              sx={{ cursor: 'pointer' }}
            />
            <Button color="error" onClick={() => handleDelete(task.id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}