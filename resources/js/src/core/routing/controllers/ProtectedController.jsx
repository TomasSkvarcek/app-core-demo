import {Navigate} from 'react-router-dom'
import {route} from "../index.jsx";
import React from "react";
import {useLocalStorage} from "react-use-storage";
import ProtectedLayout from "@/src/domain/shared/views/layouts/ProtectedLayout.jsx";
import {unauthorized_redirect_route} from "@/src/config/constants/routing.jsx";

function ProtectedController() {
    const [loggedInUser] = useLocalStorage('loggedInUser', false)

    if (!loggedInUser) {
        return <Navigate to={ route(unauthorized_redirect_route) } replace />;
    }

    return (
        <ProtectedLayout />
    )
}

export default ProtectedController
