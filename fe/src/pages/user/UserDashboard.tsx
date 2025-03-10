import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/store/features/auth/authSlice';

const UserDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Trang chủ người dùng</h1>
        <div className="mb-6">
          <p className="text-gray-600">
            Xin chào, <span className="font-semibold">{user?.username || user?.name}</span>!
          </p>
          <p className="text-gray-600">Chào mừng bạn đến với hệ thống.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">Thông tin cá nhân</h2>
            <p className="text-gray-600">Xem và cập nhật thông tin cá nhân của bạn</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <h2 className="text-lg font-semibold text-green-700 mb-2">Khóa học của tôi</h2>
            <p className="text-gray-600">Quản lý các khóa học bạn đã đăng ký</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">Lịch học</h2>
            <p className="text-gray-600">Xem lịch học và thời khóa biểu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 