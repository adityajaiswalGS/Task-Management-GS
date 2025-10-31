import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { resetNotifications } from '../features/tasks/tasksSlice';  // Adjust for auth if needed

export default function useSnackbar() {
  const dispatch = useDispatch();
  const { loginSuccess } = useSelector((state) => state.auth);
  const { createSuccess, updateSuccess, deleteSuccess, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (loginSuccess) {
      enqueueSnackbar('Login successful!', { variant: 'success' });
      dispatch(resetNotifications());  // Reset to prevent multiples
    }
  }, [loginSuccess, dispatch]);

  useEffect(() => {
    if (createSuccess) {
      enqueueSnackbar('Task created successfully!', { variant: 'success' });
      dispatch(resetNotifications());
    }
    if (updateSuccess) {
      enqueueSnackbar('Task updated successfully!', { variant: 'success' });
      dispatch(resetNotifications());
    }
    if (deleteSuccess) {
      enqueueSnackbar('Task deleted successfully!', { variant: 'success' });
      dispatch(resetNotifications());
    }
    if (status === 'failed' && error) {
      enqueueSnackbar(`Error: ${error}`, { variant: 'error' });
      dispatch(resetNotifications());
    }
  }, [createSuccess, updateSuccess, deleteSuccess, status, error, dispatch]);
}