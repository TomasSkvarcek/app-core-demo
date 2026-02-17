import {Route, Routes} from "react-router-dom";
import ProtectedController from "@/src/core/routing/controllers/ProtectedController.jsx";
import {route} from "@/src/core/routing/index.jsx";
import {routeNames} from "@/src/config/routing/routeNames.jsx";
import Dashboard from "@/src/domain/shared/views/Dashboard.jsx";
import ChangePassword from "@/src/domain/auth/views/ChangePassword.jsx";
import UserView from "@/src/domain/user/views/UserView.jsx";
import UserEditor from "@/src/domain/user/views/UserEditor.jsx";
import RoleEditor from "@/src/domain/access_control/views/RoleEditor.jsx";
import UnauthenticatedController from "@/src/core/routing/controllers/UnauthenticatedController.jsx";
import Login from "@/src/domain/auth/views/Login.jsx";
import CreatePassword from "@/src/domain/auth/views/CreatePassword.jsx";
import ResetPassword from "@/src/domain/auth/views/ResetPassword.jsx";
import ForgotPassword from "@/src/domain/auth/views/ForgotPassword.jsx";
import NotFound from "@/src/domain/shared/views/NotFound.jsx";
import React from "react";

function Routing() {
    return (
        <Routes>
            <Route element={<ProtectedController />}>
                <Route path={ route(routeNames.dashboard)} element={<Dashboard />} />
                <Route path={ route(routeNames.password_change )} element={<ChangePassword />} />
                <Route path={ route(routeNames.users_view )} element={<UserView />} />
                <Route path={ route(routeNames.user_create )} element={<UserEditor />} />
                <Route path={ route(routeNames.user_edit )} element={<UserEditor />} />
                <Route path={ route(routeNames.role_editor )} element={<RoleEditor />} />
            </Route>
            <Route element={<UnauthenticatedController />}>
                <Route path={ route(routeNames.login )} element={<Login />} />
                <Route path={ route(routeNames.password_create )} element={<CreatePassword />} />
                <Route path={ route(routeNames.password_reset) } element={<ResetPassword /> } />
                <Route path={ route(routeNames.forgot_password) } element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Routing
