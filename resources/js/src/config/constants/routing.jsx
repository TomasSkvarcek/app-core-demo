import {routeNames} from "@/src/config/routing/routeNames.jsx";

export const unauthorized_redirect_route = routeNames.login;

export const after_login_redirect_route = routeNames.dashboard;

export const after_logout_redirect_route = routeNames.login;
