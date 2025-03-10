
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const ClientLayout = () => {
    return (
        <Layout className="wrapper h-screen">
            <Layout>
                <div className="px-4 py-2">
                    <Outlet />
                </div>
            </Layout>
        </Layout>
    );
};

export default ClientLayout
