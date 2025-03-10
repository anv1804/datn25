export interface RouteProps {
  children: React.ReactNode;
}

export interface PrivateRouteProps extends RouteProps {}
export interface AdminRouteProps extends RouteProps {}
export interface UserRouteProps extends RouteProps {}
export interface PublicRouteProps extends RouteProps {} 