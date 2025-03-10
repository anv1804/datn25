import { Layout, Button, Dropdown, Menu, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectCurrentUser, logoutAsync } from '@/store/features/auth/authSlice';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { showSuccess } from '@/utils/messageUtils';
import SideBarLeft from '@/common-components/SideBarLeft';
import SideBarRight from '@/common-components/SideBarRight';
import { useMediaQuery } from 'react-responsive';

const { Content } = Layout;

const UserLayout = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: 'Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: async () => {
        await dispatch(logoutAsync());
        showSuccess('Đăng xuất thành công!');
        navigate('/dang-nhap');
      }
    });
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <a href="/profile">Trang cá nhân</a>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <a href="/settings">Cài đặt</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Layout className="flex flex-row min-h-screen bg-gray-100">
      {/* Left Sidebar - Navigation */}
      <div className={`hidden md:block`}>
        <SideBarLeft />
      </div>

      {/* Main Content Area */}
      <Layout className="flex-1 overflow-hidden">
        <Content className="p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </Content>
      </Layout>

      {/* Right Sidebar - Widgets & Info */}
      {!isTabletOrMobile && (
        <div className="hidden md:block">
          <SideBarRight />
        </div>
      )}
    </Layout>
  );
};

export default UserLayout; 