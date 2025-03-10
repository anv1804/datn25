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
import { ROUTES } from '@/configs/routes.config';
import AdminTeacherManager from '@/pages/admin/AdminTeacherManager';

const AppRouter = () => {
    return (
        <Routes>
            {/* Public routes - redirect to dashboard if authenticated */}
            <Route path={ROUTES.HOME} element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route path={ROUTES.LANDING} element={
                <PublicRoute>
                    <LandingPage />
                </PublicRoute>
            } />
            <Route path={ROUTES.LOGIN} element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />
            <Route path={ROUTES.REGISTER} element={
                <PublicRoute>
                    <Register />
                </PublicRoute>
            } />

            {/* Admin routes - only accessible by admin/collaborator */}
            <Route path={ROUTES.ADMIN.ROOT} element={
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            }>
                <Route index element={<AdminDashboard />} />
                <Route path={ROUTES.ADMIN.TEACHER} element={<AdminTeacherManager />} />
                {/* Add more admin routes here */}
            </Route>

            {/* User routes - only accessible by regular users */}
            <Route path={ROUTES.USER.ROOT} element={
                <UserRoute>
                    <UserLayout />
                </UserRoute>
            }>
                <Route index element={<UserDashboard />} />
                {/* Add more user routes here */}
            </Route>

            {/* Shared authenticated routes - accessible by any authenticated user */}
            <Route path={ROUTES.SHARED.PROFILE} element={
                <PrivateRoute>
                    <div>Profile Page</div>
                </PrivateRoute>
            } />

            {/* Error pages */}
            <Route path={ROUTES.ERROR.UNAUTHORIZED} element={<Unauthorized />} />
            <Route path={ROUTES.ERROR.NOT_FOUND} element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
    )
}

export default AppRouter
