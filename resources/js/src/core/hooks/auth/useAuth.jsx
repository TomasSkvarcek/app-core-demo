import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'react-use-storage'
import {route} from '../../routing/index.jsx'
import {API_BASE_URL} from "@/src/core/constants/api.jsx";
import {after_login_redirect_route, after_logout_redirect_route} from "@/src/config/constants/routing.jsx";

export function useAuth() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [loggedInUser, setLoggedInUser, removeLoggedInUser] = useLocalStorage('loggedInUser', false)

    const navigate = useNavigate()

    async function login(data) {
        setErrors({})
        setLoading(true)

        await axios.get('sanctum/csrf-cookie', {baseURL: API_BASE_URL})
        await axios.post("login", data, {baseURL: API_BASE_URL})
            .then(response => {
                setLoggedInUser(true)
                navigate(route(after_login_redirect_route))
            }).catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            }).finally(() => setLoading(false));
    }

    async function logout(force = false) {
        if (!force) {
            await axios.post("logout", null, {baseURL: API_BASE_URL})
        }

        removeLoggedInUser()
        navigate(route(after_logout_redirect_route))
    }

    return { login, errors, loading, logout, loggedInUser }
}
