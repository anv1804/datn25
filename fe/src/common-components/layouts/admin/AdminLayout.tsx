import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSideBarLeft from './adminSidebarLeft/AdminSidebarLeft';

const SideBarLeft = () => {

    return (
        <Layout className="h-screen">
            <AdminSideBarLeft />
            <Layout>
                <div className="px-4 py-2">
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
};

export default SideBarLeft
