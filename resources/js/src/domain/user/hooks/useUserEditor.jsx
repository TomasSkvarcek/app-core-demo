import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {route} from "../../../core/routing";
import {showSuccessMessage} from "@/src/core/helpers/alerts/successMessage";
import {useTranslation} from "react-i18next";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

export function useUserEditor(id = null) {
    const {t} = useTranslation()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const [roles, setRoles] = useState([])
    const navigate = useNavigate()

    useEffect( () => {
        const controller = new AbortController()
        loadData({ signal: controller.signal })
        return () => controller.abort()
    }, [])

    async function createUser(data) {
        setFormLoading(true)
        setErrors({})

        return axios.post('users/create', data)
            .then(() => {
                showSuccessMessage(t('user.created'))
                navigate(route(routeNames.users_view))
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setFormLoading(false))
    }

    async function updateUser(data) {
        setFormLoading(true)
        setErrors({})

        return axios.put('users/update/'+ id, data)
            .then(response => {
                showSuccessMessage(t('user.updated'))
                prepareUserData(response.data)
            })
            .catch(error => {
                if (error.response?.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setFormLoading(false))
    }

    async function loadData({ signal } = {}) {
        setLoading(true)

        await axios.get('roles', { signal })
            .then(response => {
                setRoles(response.data)
            })

        if (id !== null) {
            await axios.get( 'users/get/'+ id, { signal })
                .then(response => {
                    prepareUserData(response.data)
                })
        }

        setLoading(false)
    }

    function prepareUserData(user_api_data) {
        const user_roles = []

        user_api_data.roles?.map(role => {
            user_roles.push(role.id)
        })
        delete user_api_data.roles
        user_api_data.role_ids = user_roles
        setUserData(user_api_data)
    }

    return {
        user: { userData, setUserData },
        roles,
        createUser,
        updateUser,
        loading,
        formLoading,
        errors
    }
}
