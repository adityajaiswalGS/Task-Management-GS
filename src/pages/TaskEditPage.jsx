import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function TaskEditPage() {

  const [openConfirm, setOpenConfirm] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [tags, setTags] = useState('');
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setSubtitle(task.subtitle);
      setDate(task.date ? new Date(task.date).toISOString().slice(0, 16) : '');
      setPriority(task.priority);
      setTags(task.tags ? task.tags.join(', ') : '');
      setCompleted(task.completed);
      setBookmarked(task.bookmarked);
    }
  }, [task]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTask = {
      id,
      title,
      subtitle,
      date: new Date(date).toISOString(),
      priority,
      tags: tags.split(',').map((tag) => tag.trim()),
      bookmarked,
      completed,
    };
    dispatch({ type: 'tasks/updateRequest', payload: updatedTask });
    navigate('/dashboard');
  };

  const handleDelete = () => {
    dispatch({ type: 'tasks/deleteRequest', payload: id });
    navigate('/dashboard');
  };

  if (!task) return <Typography>Task not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Task {id}
      </Typography>
      <Box component="form" onSubmit={handleUpdate}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Subtitle"
          fullWidth
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Due Date"
          type="datetime-local"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Tags (comma-separated)"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Update Task
        </Button>
        <Button variant="outlined" color="error" onClick={() => setOpenConfirm(true)} sx={{ mt: 2, ml: 2 }}>
  Delete Task
</Button>
<ConfirmDialog
  open={openConfirm}
  onClose={() => setOpenConfirm(false)}
  onConfirm={() => {
    handleDelete();
    setOpenConfirm(false);
  }}
  title="Delete Task"
  message="Are you sure you want to delete this task?"
/>
        <Button variant="outlined" color="error" onClick={handleDelete} sx={{ mt: 2, ml: 2 }}>
          Delete Task
        </Button>
      </Box>
    </Box>
  );
}