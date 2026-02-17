import {useUserEditor} from "@/src/domain/user/hooks/useUserEditor";
import {useNavigate, useParams} from "react-router-dom";
import {route} from "../../../core/routing";
import ContentLoader from "@/src/core/components/core/ContentLoader";
import InputText from "@/src/core/components/form/inputs/InputText";
import InputSelect from "@/src/core/components/form/inputs/InputSelect";
import InputMultiSelectInline from "@/src/core/components/form/inputs/InputMultiSelectInline";
import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import PageTitle from "@/src/core/components/text/PageTitle";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {GlobalContext} from "@/src/core/contexts/GlobalContext";
import ContainerMiddle from "@/src/core/components/blocks/ContainerMiddle";
import PageTitleBackButton from "@/src/core/components/form/buttons/PageTitleBackButton";
import {getBoolSelectOptions} from "@/src/core/helpers/inputHelper";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function UserEditor() {
    const {t} = useTranslation()
    const params = useParams()
    const user_id = params.id ?? null
    const {user, createUser, updateUser, loading, formLoading, errors, roles } = useUserEditor(user_id)
    const navigate = useNavigate()
    const { globalContextData, updateGlobalContextData } = useContext(GlobalContext)
    const loggedInUserData = globalContextData?.loggedInUserData
    const activeSelectOptions = getBoolSelectOptions()

    async function handleSubmit(event) {
        event.preventDefault()

        if (user_id !== null) {
            await updateUser(user.userData)
        } else {
            await createUser(user.userData)
        }
    }

    function handleInputChange(value, field) {
        user.setUserData({
            ...user.userData,
            [field]: value,
        })
    }

    function renderUserForm() {
        return (
            <CardWrapper>
                <ContentLoader loading={loading}/>
                <form onSubmit={ handleSubmit } noValidate>
                    <InputText
                        id="email"
                        type="email"
                        name="email"
                        value={user.userData.email}
                        label={t('user.email')}
                        onChangeHandler={handleInputChange}
                        dataKey="email"
                        errors={errors?.['email']}
                        disabled={formLoading}
                        maxlength={100}
                        showAsRequired={true}
                    />
                    <InputText
                        id="first_name"
                        name="first_name"
                        value={user.userData.first_name}
                        label={t('user.first_name')}
                        onChangeHandler={handleInputChange}
                        dataKey="first_name"
                        errors={errors?.['first_name']}
                        disabled={formLoading}
                        maxlength={100}
                        showAsRequired={true}
                    />
                    <InputText
                        id="last_name"
                        name="last_name"
                        value={user.userData.last_name}
                        label={t('user.last_name')}
                        onChangeHandler={handleInputChange}
                        dataKey="last_name"
                        errors={errors?.['last_name']}
                        disabled={formLoading}
                        maxlength={100}
                        showAsRequired={true}
                    />
                    {user_id &&
                        <InputSelect
                            id="active"
                            name="active"
                            label={t('user.active')}
                            options={activeSelectOptions}
                            value={user.userData.active}
                            onChangeHandler={handleInputChange}
                            dataKey="active"
                            errors={errors?.['active']}
                            disabled={formLoading || (user?.userData?.id === loggedInUserData?.user?.id)}
                        />
                    }

                    <InputMultiSelectInline
                        id="roles"
                        options={roles}
                        values={user.userData.role_ids}
                        optionValueKey="id"
                        optionNameKey="name"
                        onChangeHandler={handleInputChange}
                        dataKey="role_ids"
                        label={t('user.roles')}
                        canSelectAll={true}
                    />
                    <div className="mt-3">
                        <ButtonAction
                            type="submit"
                            variant="primary"
                            loading={formLoading}
                            addCssClass="me-2"
                        >
                            {user_id ? t('general.edit') : t('general.create')}
                        </ButtonAction>
                        <ButtonAction
                            variant="secondary"
                            action={ () => navigate(route(routeNames.users_view)) }
                            disabled={formLoading}
                        >
                            { t('general.back') }
                        </ButtonAction>
                    </div>
                </form>
            </CardWrapper>
        )
    }

    return (
        <ContainerMiddle>
            <PageTitle text={ user_id ? t('user.edit') : t('user.create') }>
                <PageTitleBackButton
                    action={ () => navigate(route(routeNames.users_view)) }
                    disabled={formLoading}
                />
            </PageTitle>
            { renderUserForm() }
        </ContainerMiddle>
    )
}

export default UserEditor
