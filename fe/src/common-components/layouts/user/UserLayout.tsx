import { Layout, Button, Dropdown, Menu, Modal } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { selectCurrentUser, logoutAsync } from '@/store/features/auth/authSlice';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { showSuccess } from '@/utils/messageUtils';

const { Header, Content, Footer } = Layout;

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

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md flex items-center justify-between px-6">
        <div className="text-xl font-bold text-blue-600">Hệ thống học tập</div>
        <div className="flex items-center gap-4">
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
            <Button type="text" className="flex items-center">
              <span className="mr-2">{user?.name || user?.username}</span>
              <UserOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className="p-6">
        <Outlet />
      </Content>
      <Footer className="text-center">
        Hệ thống học tập © {new Date().getFullYear()} - Bản quyền thuộc về chúng tôi
      </Footer>
    </Layout>
  );
};

export default UserLayout; 