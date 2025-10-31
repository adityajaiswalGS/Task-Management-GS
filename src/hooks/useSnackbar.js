import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { resetNotifications } from '../features/tasks/tasksSlice';
import { loginSuccess as authLoginSuccess } from '../features/auth/authSlice'; // ← import action

export default function useSnackbar() {
  const dispatch = useDispatch();

  // ---- Auth ----
  const auth = useSelector(state => state.auth);
  const loginSuccess = auth.loginSuccess;   // flag set in authSlice

  // ---- Tasks ----
  const {
    createSuccess,
    updateSuccess,
    deleteSuccess,
    status,
    error,
  } = useSelector(state => state.tasks);

  // ---- Login toast (only once) ----
  useEffect(() => {
    if (loginSuccess) {
      enqueueSnackbar('Login successful!', { variant: 'success' });
      // clear the flag immediately
      dispatch({ type: 'auth/clearLoginSuccess' });
    }
  }, [loginSuccess, dispatch]);

  // ---- Task toasts (only once) ----
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