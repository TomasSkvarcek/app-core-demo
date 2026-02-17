import {useState} from "react";
import {useTranslation} from "react-i18next";
import {showInfoAlert} from "@/src/core/helpers/alerts/infoAlert.jsx";
import {useNavigate} from "react-router-dom";
import {route} from "../../routing/index.jsx";
import {after_login_redirect_route} from "@/src/config/constants/routing.jsx";

export function usePassword() {
    const {t} = useTranslation()
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [tokenIsValid, setTokenIsValid] = useState(false)
    const [actionSuccessful, setActionSuccessful] = useState(false)
    const navigate = useNavigate()

    async function validateToken(token_type, token, id, { signal } = {}) {
        if (!token || !id) {
            setErrors({token: [t('auth.invalid_password_reset_token')]})
            return
        }

        setLoading(true)

        return axios.post('auth/validate_token', {token_type: token_type, token: token, id: id}, { signal })
            .then(response => {
                setTokenIsValid(true)
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                } else {
                    setErrors({token: [t('general.error') + ' ' + t('general.try_again')]})
                }
            })
            .finally(() => setLoading(false))
    }

    async function createPassword(data) {
        setErrors({})
        setFormLoading(true)

        await axios.post("auth/create_password", data)
            .then(response => {
                setActionSuccessful(true)
            }).catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            }).finally(() => setFormLoading(false));
    }

    async function resetPassword(data) {
        setErrors({})
        setFormLoading(true)

        await axios.post("auth/reset_password", data)
            .then(response => {
                setActionSuccessful(true)
            }).catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            }).finally(() => setFormLoading(false));
    }

    async function changePassword(data) {
        setErrors({});
        setFormLoading(true);

        await axios.post("auth/change_password", data)
            .then(response => {
                showInfoAlert(t('auth.password_changed'));
                navigate(route(after_login_redirect_route));
            }).catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            }).finally(() => setFormLoading(false));
    }

    async function handleForgotPassword(data) {
        setErrors({})
        setFormLoading(true)

        await axios.post("auth/forgot_password", data)
            .then(response => {
                setActionSuccessful(true)
            }).catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            }).finally(() => setFormLoading(false));
    }

    return {
        errors,
        loading,
        formLoading,
        tokenIsValid,
        validateToken,
        createPassword,
        resetPassword,
        changePassword,
        handleForgotPassword,
        actionSuccessful
    }
}
