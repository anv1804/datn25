export const ROUTES = {
    // Public routes
    HOME: '/',
    LANDING: '/bat-dau',
    LOGIN: '/dang-nhap',
    REGISTER: '/dang-ky',

    // Admin routes
    ADMIN: {
        ROOT: '/admin',
        DASHBOARD: '/admin',
        TEACHER: '/admin/giao-vien',
        // Add more admin routes here
    },

    // User routes
    USER: {
        ROOT: '/user',
        DASHBOARD: '/user',
        // Add more user routes here
    },

    // Shared routes
    SHARED: {
        PROFILE: '/profile',
    },

    // Error pages
    ERROR: {
        UNAUTHORIZED: '/unauthorized',
        NOT_FOUND: '*'
    }
} as const;

// Type for route paths
export type RoutePath = typeof ROUTES; 