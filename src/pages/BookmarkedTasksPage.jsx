import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function BookmarkedTasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks = [] } = useSelector(state => state.tasks);
  const bookmarked = tasks.filter(t => t.bookmarked);

  useEffect(() => {
    dispatch({ type: 'tasks/fetchRequest' });
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Bookmarked Tasks ({bookmarked.length})
      </Typography>
      {bookmarked.length === 0 ? (
        <Typography>No bookmarked tasks.</Typography>
      ) : (
        <List>
          {bookmarked.map(task => (
            <ListItem
              key={task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemText
                primary={task.title}
                secondary={task.subtitle}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}