import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
      <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 2 }}>
        Go Home
      </Button>
    </Box>
  );
}