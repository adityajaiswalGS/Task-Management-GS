import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

export default function TaskCreatePage() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('low');
  const [tags, setTags] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      subtitle,
      date: new Date(date).toISOString(),
      priority,
      tags: tags.split(',').map((tag) => tag.trim()),
      bookmarked: false,
      completed: false,
    };
    dispatch({ type: 'tasks/createRequest', payload: task });
    navigate('/dashboard');
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Typography variant="h5" gutterBottom>
        Create New Task
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Subtitle"
          fullWidth
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Due Date"
          type="datetime-local"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <FormControl fullWidth margin="normal" required>
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
        <Button 
  onClick={() => navigate('/dashboard')} 
  variant="contained" 
  sx={{ mt: 2 , mr: 2}}
>
  Back
</Button>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Create Task
        </Button>
      </Box>
    </Box>
  );
}