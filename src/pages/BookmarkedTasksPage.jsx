import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function BookmarkedTasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const tasks = useSelector(state => state.tasks.tasks || []);
  const bookmarked = tasks.filter(t => t.bookmarked);


  useEffect(() => {

    if (tasks.length === 0) {
      dispatch({ type: 'tasks/fetchRequest' });
    }
  }, [dispatch, tasks.length]);

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
              sx={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              <ListItemText
                primary={task.title || 'Untitled'}
                secondary={`${task.subtitle || 'No description'} - ${
                  task.priority || 'N/A'
                } - ${task.date ? new Date(task.date).toLocaleDateString() : 'No date'}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}