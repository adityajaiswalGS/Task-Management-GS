import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import useSnackbar from '../hooks/useSnackbar';
import { selectPaginatedTasks ,selectFilteredAndSortedTasks } from '../features/tasks/selectors';  // ← NEW
import { setSearchQuery, setSortBy, loadMore } from '../features/tasks/tasksSlice';  // ← ADD loadMore

export default function DashboardPage() {
  useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(s => s.auth.user);
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);

  const {
    status = 'idle',
    error = null,
    searchQuery = '',
    sortBy = 'date',
  } = useSelector(s => s.tasks || {});

  const paginatedTasks = useSelector(selectPaginatedTasks);  // ← PAGINATED
const allFilteredTasks = useSelector(selectFilteredAndSortedTasks);  
  const { pagination } = useSelector(s => s.tasks);


  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

 useEffect(() => {
  if (isAuthenticated) {
    dispatch({ type: 'tasks/fetchRequest' });
  }
}, [isAuthenticated, dispatch]);


  const handleLogout = () => dispatch({ type: 'auth/logoutRequest' });

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      dispatch({ type: 'tasks/deleteRequest', payload: id });
    }
  };

  const handleToggleBookmark = (id) => {
    dispatch({ type: 'tasks/toggleBookmarkRequest', payload: id });
  };

  const priorityText = (num) => {
  const map = { 0: 'Low', 1: 'Medium', 2: 'High' };
  return map[num] || 'N/A';
};

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome + Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        {/* <Typography variant="h5">Welcome, {user?.name || 'User'}!</Typography> */}
        <Box sx={{ display: 'flex', gap: 2 }}>
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
      </Box>

      {/* Search & Sort */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          sx={{ width: 400 }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            label="Sort By"
          >
            <MenuItem value="date">Due Date</MenuItem>
            <MenuItem value="priority">Priority</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" gutterBottom>
        All Tasks ({allFilteredTasks.length})
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && error && <Typography color="error">Error: {error}</Typography>}
      {status === 'succeeded' && allFilteredTasks.length === 0 && <Typography>No tasks yet.</Typography>}

      {status === 'succeeded' && allFilteredTasks.length > 0 && (
        <>
          <List>
            {paginatedTasks.map(task => (
              <ListItem
              secondary={`... - ${priorityText(task.priority)} - ...`}
                key={task.id}
                onClick={() => navigate(`/tasks/${task.id}`)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  borderBottom: '1px solid #eee',
                }}
              >
                <ListItemText
                  primary={task.title || 'Untitled'}
                  secondary={`${task.subtitle || 'No description'} - ${
                    task.priority || 'N/A'
                  } - ${task.date ? new Date(task.date).toLocaleDateString() : 'No date'}`}
                />
                <ListItemSecondaryAction>
                  <Tooltip title={task.bookmarked ? 'Remove bookmark' : 'Bookmark'}>
                    <IconButton
                      edge="end"
                      onClick={e => {
                        e.stopPropagation();
                        handleToggleBookmark(task.id);
                      }}
                    >
                      {task.bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(task.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Load More */}
          {paginatedTasks.length < allFilteredTasks.length && (
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="outlined" onClick={() => dispatch(loadMore())}>
                Load More ({paginatedTasks.length} of {allFilteredTasks.length})
              </Button>
            </Box>
          )}
        </>
      )}

      {/* Navigation */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={() => navigate('/tasks/create')}>
          Add New Task
        </Button>
      <Button
    variant="outlined"
    onClick={() => {
      dispatch({ type: 'tasks/fetchRequest' });
      navigate('/bookmarks');
    }}
  >
    Bookmarked Tasks
  </Button>
      </Box>
    </Box>
  );
}