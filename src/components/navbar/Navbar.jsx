import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleTheme } from '../../features/ui/uiSlice';
import { AppBar, Toolbar, IconButton, Typography, Switch, Avatar, Popover, Box, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((state) => state.ui.themeMode);
  const user = useSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch({ type: 'auth/logoutRequest' });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Management GS
        </Typography>
        <Switch
          checked={themeMode === 'dark'}
          onChange={() => dispatch(toggleTheme())}
          color="default"
        />
        <IconButton onClick={handleProfileClick} color="inherit">
          <Avatar src={user?.avatar} alt={user?.name} />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">{user?.name}</Typography>
            <Typography>{user?.email}</Typography>
            <Button onClick={handleLogout} color="error">Logout</Button>
          </Box>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}