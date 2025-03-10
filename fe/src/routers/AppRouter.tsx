import { Route, Routes } from 'react-router-dom'
import AdminLayout from '@/common-components/layouts/admin/AdminLayout';
import UserLayout from '@/common-components/layouts/user/UserLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard/AdminDashboard';
import UserDashboard from '@/pages/user/UserDashboard';
import Login from '@/pages/Init/Login';
import Register from '@/pages/Init/Register';
import LandingPage from '@/pages/Init/LandingPage/LandingPage';
import Unauthorized from '@/pages/Unauthorized';
import { PublicRoute } from '@/components/auth/PublicRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';
import { UserRoute } from '@/components/auth/UserRoute';
import { PrivateRoute } from '@/components/auth/PrivateRoute';

const AppRouter = () => {
    return (
        <Routes>
            {/* Public routes - redirect to dashboard if authenticated */}
            <Route path="/" element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route path="/bat-dau" element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route path="/dang-nhap" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path="/dang-ky" element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />

            {/* Admin routes - only accessible by admin/collaborator */}
            <Route path="/admin" element={
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            }>
                <Route index element={<AdminDashboard />} />
                {/* Add more admin routes here */}
            </Route>

            {/* User routes - only accessible by regular users */}
            <Route path="/user" element={
                <UserRoute>
                    <UserLayout />
                </UserRoute>
            }>
                <Route index element={<UserDashboard />} />
                {/* Add more user routes here */}
            </Route>

            {/* Shared authenticated routes - accessible by any authenticated user */}
            <Route path="/profile" element={
                <PrivateRoute>
                    <div>Profile Page</div>
                </PrivateRoute>
            } />

            {/* Error pages */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
    )
}

export default AppRouter
