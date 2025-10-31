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
import useSnackbar from '../hooks/useSnackbar';
import { selectFilteredAndSortedTasks } from '../features/tasks/selectors';
import { setSearchQuery, setSortBy } from '../features/tasks/tasksSlice';

export default function DashboardPage() {
  useSnackbar();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(s => s.auth.user);
  const isAuthenticated = useSelector(s => s.auth.isAuthenticated);

  // ---- safe defaults ----
  const {
    status = 'idle',
    error = null,
    searchQuery = '',
    sortBy = 'date',
  } = useSelector(s => s.tasks || {});

  const allTasks = useSelector(selectFilteredAndSortedTasks);   // filtered + sorted

  useEffect(() => {
    dispatch({ type: 'tasks/fetchRequest' });
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleLogout = () => dispatch({ type: 'auth/logoutRequest' });

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      dispatch({ type: 'tasks/deleteRequest', payload: id });
    }
  };
  
const handleToggleBookmark = (id) => {
  dispatch({ type: 'tasks/toggleBookmark', payload: id });  // ← Triggers saga
};

  return (
    <Box sx={{ p: 10 }}>
      {/* <Typography variant="h" sx={{ display: 'flex',mt:-15 }} gutterBottom>
        Welcome, {user?.name || 'User'}!
      </Typography> */}
      <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft : 145 , marginTop: -15 }}>
        Logout
      </Button>

      {/* Search & Sort */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, mt:-10, alignItems: 'center' }}>
        <TextField
          size="small"
          placeholder="Search tasks heree..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          sx={{ width: 800 }}
          variant="outlined"
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
        All Tasks ({allTasks.length})
      </Typography>

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && error && (
        <Typography color="error">Error: {error}</Typography>
      )}
      {status === 'succeeded' && allTasks.length === 0 && (
        <Typography>No tasks yet.</Typography>
      )}

      {status === 'succeeded' && allTasks.length > 0 && (
        <List>
          {allTasks.map(task => (
            <ListItem
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
                      e.stopPropagation();               // prevent navigation
                      handleToggleBookmark(task.id);
                    }}
                  >
                    {task.bookmarked ? (
                      <BookmarkIcon color="primary" />
                    ) : (
                      <BookmarkBorderIcon />
                    )}
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
      )}

      {/* ---------- NAVIGATION ---------- */}
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => navigate('/tasks/create')}>
          Add New Task
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/bookmarks')}
          sx={{ ml: 2 }}
        >
          Bookmarked Tasks
        </Button>
      </Box>
    </Box>
  );
}