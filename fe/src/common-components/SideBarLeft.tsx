import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Button, Input, Upload, Modal } from "antd";
import { useSidebar } from '@/helpers/sidebarHelper';
import { Link, useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";

import IconWallet from "@/assets/icons/IconWallet";
import IconLogoutFlash from "@/assets/icons/IconLogoutFlash";
import IconUploadFlat from "@/assets/icons/IconUploadFlat";
import IconMenuFlat from "@/assets/icons/IconMenuFlat";
import IconFlash from "@/assets/icons/IconFlash";
import IconCalendar from '@/assets/icons/IconCalendar';
import IconEducation from "@/assets/icons/IconEducation";
import IconChat from "@/assets/icons/IconChat";
import IconCompany from "@/assets/icons/IconCompany";
import IconFolder from "@/assets/icons/IconFolder";
import { useAppDispatch } from "@/hooks/redux";
import { showSuccess } from "@/utils/messageUtils";
import { logoutAsync } from "@/store/features/auth/authSlice";

const { Sider } = Layout;

const SideBarLeft = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const { isSidebarVisible, toggleSidebar, closeSidebar } = useSidebar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const props = {
    name: "file",
    action: "/upload",
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
  return (
    <div className={`sidebarleft w-full max-w-[240px] ${!collapsed ? "text-2xl" : "max-w-[80px]"} overflow-auto`}>
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
        className={`h-screen bg-white border-r-[1px] float-left overflow-x-hidden overflow-y-auto transition-transform duration-300 z-50 top-0 ${isSidebarVisible ? "translate-x-0 " : "translate-x-full disabled"
          } md:translate-x-0`}
        // collapsible
        collapsed={collapsed}
      >
        {/* Collapse Button */}
        <div className={`absolute top-5 z-50  ${collapsed ? "right-6" : "right-3"}`}>
          <Button
            onClick={toggleCollapsed}
            className="bg-transparent hover:bg-gray-200 border-none shadow-none"
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
                <div className="text-black font-bold">Jone Copper</div>
                <div className="text-gray-400 text-[10px]">UI Designer</div>
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
              <Menu.Item key="1" icon={<IconFlash />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<IconCalendar />}>
                <Link to={`/lich-trinh`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lịch Trình</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<IconEducation />}>
                <Link to={`/lop-hoc`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lớp Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<IconChat />}>
                <Link to={`/tro-chuyen`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trò Chuyện</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<IconCompany />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<IconFolder />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Tài Liệu</span>}
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

export default SideBarLeft;
