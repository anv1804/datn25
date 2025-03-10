import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/store/features/auth/authSlice';

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    // Redirect based on user role
    if (user?.role === 'user') {
      navigate('/user');
    } else if (user?.role === 'admin' || user?.role === 'collaborator') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Không có quyền truy cập</h1>
          <div className="mb-6">
            <svg
              className="w-16 h-16 text-red-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <p className="text-gray-700 mb-6">
            Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goBack}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              Quay lại
            </button>
            <button
              onClick={goHome}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 