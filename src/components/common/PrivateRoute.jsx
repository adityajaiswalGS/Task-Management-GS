import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { isTokenValid } from '../../utils/fakeJWT';

export default function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();

  const authenticated = token && isTokenValid(token);

  return authenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}