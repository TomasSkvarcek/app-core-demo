import {Navigate} from 'react-router-dom'
import {route} from "../index.jsx";
import React from "react";
import {useLocalStorage} from "react-use-storage";
import UnauthenticatedLayout from "@/src/domain/shared/views/layouts/UnauthenticatedLayout.jsx";
import {after_login_redirect_route} from "@/src/config/constants/routing.jsx";

function UnauthenticatedController() {
    const [loggedInUser] = useLocalStorage('loggedInUser', false)

    if (loggedInUser) {
        return <Navigate to={ route(after_login_redirect_route) } replace />;
    }

    return (
        <UnauthenticatedLayout />
    )
}

export default UnauthenticatedController
