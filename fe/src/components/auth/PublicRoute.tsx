import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated, selectCurrentUser } from '@/store/features/auth/authSlice';
import { PublicRouteProps } from '@/types/index';

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  
  // If user is authenticated, redirect to their appropriate dashboard
  if (isAuthenticated) {
    // Redirect based on user role
    if (user?.role === 'user') {
      return <Navigate to="/user" state={{ from: location }} replace />;
    } else if (user?.role === 'admin' || user?.role === 'collaborator') {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
  }

  // If not authenticated, render the children (public page)
  return <>{children}</>;
}; 