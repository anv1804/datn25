import { useState } from "react";
import { Layout, Menu, Avatar, Button, Upload, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import IconLogoutFlash from "@/assets/icons/IconLogoutFlash";
import IconMenuFlat from "@/assets/icons/IconMenuFlat";
import IconWallet from "@/assets/icons/IconWallet";
import IconUploadFlat from "@/assets/icons/IconUploadFlat";
import { useSidebar } from "@/helpers/sidebarHelper";
import IconClass from "@/assets/icons/iconClass";
import IconBookMark from "@/assets/icons/IconBookMark";
import IconChart from "@/assets/icons/iconChart";
import IconHappy from "@/assets/icons/iconHappy";
import IconUser from "@/assets/icons/IconUser";
import IconBook from "@/assets/icons/IconBook";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logoutAsync, selectCurrentUser } from "@/store/features/auth/authSlice";
import { showSuccess } from "@/utils/messageUtils";

const { Sider } = Layout;

const AdminSideBarLeft = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const { isSidebarVisible, closeSidebar } = useSidebar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentUser);
  
  // Handle logout with confirmation
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
  
  const props = {
    name: "file",
    action: "/upload", // URL xử lý upload file
    headers: {
      authorization: "Bearer your-auth-token",
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className={`sidebarleftadmin w-full h-screen max-w-[240px] ${!collapsed ? "text-2xl" : "max-w-[80px]"} overflow-auto`}>
      {/* Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={closeSidebar}
        />
      )}
      {/* Sidebar */}
      <Sider
        width={240}
        className={`h-screen bg-white border-r-[1px] float-left overflow-x-hidden overflow-y-auto transition-transform duration-300 z-50 top-0 ${isSidebarVisible ? "translate-x-0 " : "-translate-x-full "
          } md:translate-x-0 fixed`}
        // collapsible
        collapsed={collapsed}
      >
        {/* Collapse Button */}
        <div className={`absolute top-5 z-50  ${collapsed ? "right-6" : "right-3"}`}>
          <Button
            onClick={toggleCollapsed}
            className="bg-transparent hover:bg-gray-200 border-none shadow-none "
            icon={<IconMenuFlat />}
          />
        </div>

        {/* Logo */}
        <div className="realative h-full flex flex-col items-center py-4 overflow-x-hidden">
          <h2
            className={`logo1 text-blue-500 text-4xl font-semibold uppercase mb-4 ${collapsed ? "text-2xl opacity-0" : ""
              }`}
          >
            Tclass.
          </h2>

          {/* User Profile */}
          <div
            className={`flex gap-2 w-[80%] items-center justify-start pb-4 border-b-[1px] ${collapsed ? "justify-center" : ""
              }`}
          >
            <Avatar
              size={collapsed ? 48 : 48}
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />

            {!collapsed && (
              <div>
                <div className="text-black font-bold">{currentUser?.name || currentUser?.username}</div>
                <div className="text-gray-400 text-[10px]">{currentUser?.role === 'admin' ? 'Quản trị viên' : 'Cộng tác viên'}</div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap h-full w-full">
            {/* Menu Items */}
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              className="w-full"
              inlineCollapsed={collapsed}
            >
              <Menu.Item key="1" icon={<IconChart />}>
                <Link to={`/admin`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Thống Kê</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<IconBookMark />}>
                <Link to={`/admin/su-kien`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Sự Kiện</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<IconClass />}>
                <Link to={`/admin/lop-hoc`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lớp Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<IconHappy />}>
                <Link to={`/admin/hoc-sinh`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Học Sinh</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<IconUser />}>
                <Link to={`/admin/giao-vien`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Giáo Viên</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<IconBook />}>
                <Link to={`/admin/mon-hoc`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Môn Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<IconWallet />}>
                <Link to={`/vi`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Ví</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link to="/profile">Trang Cá Nhân</Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="w-full absolute bottom-6">
            {/* Upload Button */}
            <div className="mt-8 w-full px-6 ">
              <Upload {...props} className="!w-full">
                <Button
                  icon={<IconUploadFlat />}
                  className={`${!collapsed
                    ? "py-12 "
                    : "py-6 !bg-transparent !border-none hover:!bg-transparent"
                    } !rounded-[20px] w-full bg-blue-700 text-white hover:!bg-blue-800 hover:!text-white font-semibold`}
                >
                  {!collapsed && "Upload File"}
                </Button>
              </Upload>
            </div>
            {/* Logout Button */}
            <div className="mt-8 px-6">
              <Button 
                icon={<IconLogoutFlash />} 
                onClick={handleLogout}
                className={`w-full ${!collapsed ? "flex items-center justify-start" : "flex items-center justify-center"} !border-none hover:bg-gray-100`}
              >
                {!collapsed && <span className="ml-2">Đăng xuất</span>}
              </Button>
            </div>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default AdminSideBarLeft;
