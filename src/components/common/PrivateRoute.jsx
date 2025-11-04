import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isTokenValid } from '../../utils/fakeJWT';

export default function PrivateRoute({ children }) {
  const { token, isAuthenticated } = useSelector((state) => state.auth); 
  const location = useLocation();

  const authenticated = isAuthenticated && token && isTokenValid(token);

  return authenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}