import { useState } from 'react'
import {useAuth} from "@/src/core/hooks/auth/useAuth.jsx";
import InputText from "@/src/core/components/form/inputs/InputText";
import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";
import {route} from "../../../core/routing";
import ContainerSmall from "@/src/core/components/blocks/ContainerSmall";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function Login() {
    const [loginData, setLoginData] = useState({})
    const { login, errors, loading } = useAuth()
    const { t } = useTranslation()

    async function handleSubmit(event) {
        event.preventDefault()

        await login(loginData)

        setLoginData({...loginData, password: null})
    }

    function handleInputChange(value, field) {
        setLoginData({
            ...loginData,
            [field]: value,
        })
    }

    return (
        <ContainerSmall>
            <CardWrapper title={ t('auth.login') }>
                <form onSubmit={ handleSubmit } noValidate>
                    <InputText
                        id="email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        label={ t('auth.email') }
                        onChangeHandler={handleInputChange}
                        dataKey="email"
                        errors={errors?.['email']}
                        disabled={loading}
                        maxlength={250}
                    />
                    <InputText
                        id="password"
                        type="password"
                        name="password"
                        value={loginData.password}
                        label={ t('auth.password') }
                        onChangeHandler={handleInputChange}
                        dataKey="password"
                        errors={errors?.['password']}
                        disabled={loading}
                        maxlength={250}
                    />
                    <div className="mt-3">
                        <ButtonAction
                            type="submit"
                            loading={loading}
                        >
                            { t('auth.login') }
                        </ButtonAction>
                        <Link to={ route(routeNames.forgot_password) } className="btn btn-link float-end">
                            { t('auth.forgot_password_link') }
                        </Link>
                    </div>
                </form>
            </CardWrapper>
        </ContainerSmall>
    )
}

export default Login
