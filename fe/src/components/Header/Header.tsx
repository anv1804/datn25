import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectIsAuthenticated, selectCurrentUser, logout } from '../../store/features/auth/authSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      {isAuthenticated ? (
        <div>
          <span>Xin chào, {user?.fullName}</span>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Đăng nhập</Link>
        </div>
      )}
    </header>
  );
};

export default Header; 