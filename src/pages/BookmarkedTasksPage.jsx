import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Box, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';

export default function BookmarkedTasksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks = [], status } = useSelector((state) => state.tasks);

    const handleLogout = () => dispatch({ type: 'auth/logoutRequest' });


  // Fetch tasks if not loaded
  useEffect(() => {
    if (tasks.length === 0 && status !== 'loading') {
      dispatch({ type: 'tasks/fetchRequest' });
    }
  }, [dispatch, tasks.length, status]);

  const bookmarkedTasks = tasks.filter(t => t.bookmarked);

  return (
   

    <Box sx={{ p: 3 }}>

       {/* // Shreyansh sir review fix  */}

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
    <Button 
      onClick={() => navigate('/dashboard')} 
      variant="contained" 
    >
      Back
    </Button>

  <Button
    variant="outlined"
    onClick={() => dispatch({ type: 'tasks/fetchRequest' })}
    startIcon={<RefreshIcon />}
  >
    Reload
  </Button>
  <Button variant="contained" color="error" onClick={handleLogout}>
    Logout
  </Button>
</Box>




      <Typography variant="h5" gutterBottom>
        Bookmarked Tasks ({bookmarkedTasks.length})
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {bookmarkedTasks.length === 0 && status !== 'loading' && (
        <Typography>No bookmarked tasks.</Typography>
      )}

      {bookmarkedTasks.length > 0 && (
        <List>
          {bookmarkedTasks.map(task => (
            <ListItem
              key={task.id}
              onClick={() => navigate(`/tasks/${task.id}`)}
              sx={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              <ListItemText
                primary={task.title}
                secondary={`${task.subtitle} - ${task.priority} - ${task.date ? new Date(task.date).toLocaleDateString() : 'No date'}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}