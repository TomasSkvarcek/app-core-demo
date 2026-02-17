import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import InputText from "@/src/core/components/form/inputs/InputText";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import ContainerSmall from "@/src/core/components/blocks/ContainerSmall";
import {useTranslation} from "react-i18next";
import {usePassword} from "@/src/core/hooks/auth/usePassword.jsx";
import {useState} from "react";

function ChangePassword() {
    const {t} = useTranslation();
    const {
        errors,
        formLoading,
        changePassword
    } = usePassword();
    const [data, setData] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();

        await changePassword(data);
    }

    function handleInputChange(value, field) {
        setData({
            ...data,
            [field]: value,
        })
    }

    return (
        <ContainerSmall>
            <CardWrapper title={t('auth.password_change')}>
                <form onSubmit={ handleSubmit } noValidate>
                    <InputText
                        id="old_password"
                        type="password"
                        name="old_password"
                        value={data.old_password}
                        label={t('auth.old_password')}
                        onChangeHandler={handleInputChange}
                        dataKey="old_password"
                        errors={errors?.['old_password']}
                        disabled={formLoading}
                        maxlength={250}
                    />
                    <div className="fw-bold mb-3 mt-3">
                        {t('auth.password_policy')}
                    </div>
                    <InputText
                        id="new_password"
                        type="password"
                        name="new_password"
                        value={data.new_password}
                        label={t('auth.new_password')}
                        onChangeHandler={handleInputChange}
                        dataKey="new_password"
                        errors={errors?.['new_password']}
                        disabled={formLoading}
                        maxlength={250}
                    />
                    <InputText
                        id="new_password_confirmation"
                        type="password"
                        name="new_password_confirmation"
                        value={data.new_password_confirmation}
                        label={t('auth.confirm_password')}
                        onChangeHandler={handleInputChange}
                        dataKey="new_password_confirmation"
                        errors={errors?.['new_password_confirmation']}
                        disabled={formLoading}
                        maxlength={250}
                    />
                    <div className="mt-3">
                        <ButtonAction
                            type="submit"
                            loading={formLoading}
                        >
                            {t('auth.change_password')}
                        </ButtonAction>
                    </div>
                </form>
            </CardWrapper>
        </ContainerSmall>
    )
}

export default ChangePassword
