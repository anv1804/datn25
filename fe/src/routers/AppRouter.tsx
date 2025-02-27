import { Route, Routes } from 'react-router-dom'
import AdminLayout from '@/common-components/layouts/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard/AdminDashboard';
import Login from '@/pages/Init/Login';
import Register from '@/pages/Init/Register';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/dang-nhap" element={<Login />} />
            <Route path="/dang-ky" element={<Register />} />
        </Routes>
    )
}

export default AppRouter
