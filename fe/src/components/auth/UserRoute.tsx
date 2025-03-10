import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated, selectCurrentUser } from '@/store/features/auth/authSlice';
import { UserRouteProps } from '@/types/index';

export const UserRoute = ({ children }: UserRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  if (user?.role !== 'user') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}; 