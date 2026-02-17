import {usePassword} from "@/src/core/hooks/auth/usePassword.jsx";
import ContentLoader from "@/src/core/components/core/ContentLoader";
import Message from "@/src/core/components/text/Message";
import InputText from "@/src/core/components/form/inputs/InputText";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {route} from "../../../../core/routing";
import {useTranslation} from "react-i18next";
import ContainerSmall from "@/src/core/components/blocks/ContainerSmall";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function ResetPasswordComponent({ type }) {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const id = urlParams.get('id')
    const {t} = useTranslation()
    const {
        errors,
        loading,
        formLoading,
        tokenIsValid,
        validateToken,
        createPassword,
        resetPassword,
        actionSuccessful
    } = usePassword()
    const [data, setData] = useState({})

    useEffect(() => {
        const controller = new AbortController()
        validateToken(type, token, id, { signal: controller.signal })
        return () => controller.abort()
    }, []);

    async function handleSubmit(event) {
        event.preventDefault()

        const preparedData = {
            ...data,
            token: token,
            id: id
        }

        if (type === 'password_create') {
            await createPassword(preparedData)
        } else if (type === 'password_reset') {
            await resetPassword(preparedData)
        }

    }

    function handleInputChange(value, field) {
        setData({
            ...data,
            [field]: value,
        })
    }

    function renderResetPasswordForm() {
        return (
            <ContainerSmall>
                <CardWrapper title={t('auth.title_' + type)}>
                    <form onSubmit={ handleSubmit } noValidate>
                        <InputText
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            label={t(type === 'password_create' ? 'auth.password' : 'auth.new_password')}
                            onChangeHandler={handleInputChange}
                            dataKey="password"
                            errors={errors?.['password']}
                            disabled={formLoading}
                            maxlength={250}
                        />
                        <InputText
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            label={t('auth.confirm_password')}
                            onChangeHandler={handleInputChange}
                            dataKey="password_confirmation"
                            errors={errors?.['password_confirmation']}
                            disabled={formLoading}
                            maxlength={250}
                        />
                        <div className="mt-3">
                            <ButtonAction
                                type="submit"
                                loading={formLoading}
                            >
                                {t('auth.' + type)}
                            </ButtonAction>
                        </div>
                    </form>
                </CardWrapper>
            </ContainerSmall>
        )
    }

    function renderPasswordChangeSuccess() {
        return (
            <div className="mt-5">
                <Message type="success" dismissible={false}>
                    {t('auth.success_' + type)}<br/>
                    <Link to={ route(routeNames.login) } className="alert-link">{t('auth.you_can_login')}</Link>
                </Message>
            </div>
        )
    }

    if (loading) {
        return <ContentLoader loading={true} />
    } else if (errors?.token) {
        return (
            <div className="mt-5">
                <Message type="error" dismissible={false}>{errors?.token[0]}</Message>
            </div>
        )
    } else if (actionSuccessful) {
        return renderPasswordChangeSuccess()
    } else if (tokenIsValid) {
        return renderResetPasswordForm()
    }
}

export default ResetPasswordComponent
