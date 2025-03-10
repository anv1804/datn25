import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectIsAuthenticated } from '@/store/features/auth/authSlice';
import { PrivateRouteProps } from '@/types/index';

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 