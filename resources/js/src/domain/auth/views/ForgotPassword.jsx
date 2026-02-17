import InputText from "@/src/core/components/form/inputs/InputText";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import {useTranslation} from "react-i18next";
import {usePassword} from "@/src/core/hooks/auth/usePassword.jsx";
import {useState} from "react";
import ContainerSmall from "@/src/core/components/blocks/ContainerSmall";
import {route} from "../../../core/routing";
import {Link} from "react-router-dom";
import Message from "@/src/core/components/text/Message";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function ForgotPassword() {
    const {t} = useTranslation()
    const {
        errors,
        formLoading,
        handleForgotPassword,
        actionSuccessful
    } = usePassword()
    const [data, setData] = useState({})

    async function handleSubmit(event) {
        event.preventDefault()

        await handleForgotPassword(data)
    }

    function handleInputChange(value, field) {
        setData({
            ...data,
            [field]: value,
        })
    }

    function renderForgotPasswordForm() {
        return (
            <ContainerSmall>
                <CardWrapper title={t('auth.forgot_password')}>
                    <form onSubmit={ handleSubmit } noValidate>
                        <InputText
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            label={t('auth.forgot_password_email')}
                            onChangeHandler={handleInputChange}
                            dataKey="email"
                            errors={errors?.['email']}
                            disabled={formLoading}
                            maxlength={100}
                        />
                        <div className="mt-3">
                            <ButtonAction
                                type="submit"
                                loading={formLoading}
                            >
                                {t('general.send')}
                            </ButtonAction>
                            <Link to={ route(routeNames.login) } className="btn btn-link float-end">
                                { t('auth.back_login') }
                            </Link>
                        </div>
                    </form>
                </CardWrapper>
            </ContainerSmall>
        )
    }

    function renderForgotPasswordMailSend() {
        return (
            <div className="mt-5">
                <Message type="success" dismissible={false} >
                    {t('auth.success_forgot_password_mail_send')}
                </Message>
            </div>
        )
    }

    if (actionSuccessful) {
        return renderForgotPasswordMailSend()
    } else {
        return renderForgotPasswordForm()
    }
}

export default ForgotPassword
