import {useRoleEditor} from "@/src/domain/access_control/hooks/useRoleEditor";
import {useTranslation} from "react-i18next";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import InputText from "@/src/core/components/form/inputs/InputText";
import ActionModal from "@/src/core/components/modal/ActionModal";
import {useModal} from "@/src/core/hooks/components/useModal";
import ActionItemList from "@/src/core/components/views/ActionItemList";
import CardWrapper from "@/src/core/components/blocks/CardWrapper";
import ContentLoader from "@/src/core/components/core/ContentLoader";
import PageTitle from "@/src/core/components/text/PageTitle";
import RelativeDiv from "@/src/core/components/blocks/RelativeDiv";
import ContainerLarge from "@/src/core/components/blocks/ContainerLarge";
import GroupMultiSelectInline from "@/src/core/components/form/inputs/GroupMultiSelectInline";
import privilegeCodes from "@/src/config/constants/privileges.jsx";
import InputLabel from "@/src/core/components/form/inputs/InputLabel";

function RoleEditor() {
    const {t} = useTranslation()
    const {
        role,
        privileges,
        roles,
        selectRole,
        selectedRoleID,
        clearSelectedRole,
        createRole,
        updateRole,
        deleteRole,
        roleLoading,
        formLoading,
        deleteLoading,
        roleListLoading,
        errors
    } = useRoleEditor()
    const {openModal, closeModal, getModalState} = useModal()

    const deleteRoleModal = 'delete-role'
    const privilegeGroups = [
        {
            name: t('access_control.user_privileges'),
            values: [
                {
                    key: privilegeCodes.user_view,
                    name: t('privileges.' + privilegeCodes.user_view)
                },
                {
                    key: privilegeCodes.user_create,
                    name: t('privileges.' + privilegeCodes.user_create)
                },
                {
                    key: privilegeCodes.user_edit,
                    name: t('privileges.' + privilegeCodes.user_edit)
                },
                {
                    key: privilegeCodes.user_delete,
                    name: t('privileges.' + privilegeCodes.user_delete)
                }
            ]
        },
        {
            name: t('access_control.role_privileges'),
            values: [
                {
                    key: privilegeCodes.role_setup,
                    name: t('privileges.' + privilegeCodes.role_setup)
                }
            ]
        }
    ]

    async function handleSubmit(event) {
        event.preventDefault()

        if (selectedRoleID) {
            await updateRole(role.roleData)
        } else {
            await createRole(role.roleData)
        }
    }

    function handleInputChange(value, field) {
        role.setRoleData({
            ...role.roleData,
            [field]: value,
        })
    }

    async function removeRole() {
        await deleteRole(selectedRoleID)
        closeModal(deleteRoleModal)
    }

    function renderRoleEditor() {
        return (
            <CardWrapper>
                <ContentLoader loading={roleLoading} />
                <form onSubmit={ handleSubmit } noValidate>
                    {!selectedRoleID && <h3>{t('role.create_role')}</h3>}

                    <div className="row mb-4">
                        <div className="col-auto">
                            <InputLabel id="role_name" label={t('role.name')} cssClass="col-form-label" />
                        </div>
                        <div className="col-auto">
                            <InputText
                                id="role_name"
                                name="role_name"
                                value={role.roleData.name}
                                placeholder={t('role.name')}
                                onChangeHandler={handleInputChange}
                                dataKey="name"
                                errors={errors?.['name']}
                                disabled={formLoading}
                                maxlength={50}
                                setBottomMargin={false}
                                size="normal"
                            />
                        </div>
                        <div className="col-auto">
                            <ButtonAction
                                type="submit"
                                variant="primary"
                                loading={formLoading}
                            >
                                {t(selectedRoleID ? 'general.edit' : 'general.create')}
                            </ButtonAction>
                        </div>
                        { selectedRoleID && (
                            <div className="col-auto">
                                <ButtonAction
                                    variant="danger"
                                    action={() => openModal(deleteRoleModal)}
                                    disabled={formLoading}
                                >
                                    {t('general.delete')}
                                </ButtonAction>
                            </div>
                        )}
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <GroupMultiSelectInline
                                id="privileges"
                                groupSettings={privilegeGroups}
                                options={privileges}
                                values={role.roleData.privilege_ids}
                                optionValueKey="id"
                                optionNameKey="code"
                                onChangeHandler={handleInputChange}
                                dataKey="privilege_ids"
                                label={t('role.privileges')}
                                canSelectAll={true}
                            />
                        </div>
                    </div>
                </form>
            </CardWrapper>
        )
    }

    return (
        <ContainerLarge>
            <PageTitle text={t('menu.roles')} />
            <div className="row mt-3">
                <div className="col-3">
                    <RelativeDiv>
                        <ContentLoader loading={roleListLoading} />
                        <ButtonAction
                            action={clearSelectedRole}
                            cssClass="btn btn-primary w-100 mb-2"
                        >
                            {t('role.create')}
                        </ButtonAction>
                        <ActionItemList
                            items={roles}
                            selectRoleHandler={selectRole}
                            selectedRoleID={selectedRoleID}
                        />
                    </RelativeDiv>
                </div>
                <div className="col-9">
                    { renderRoleEditor() }
                </div>
            </div>

            {/* Modals */}
            <ActionModal
                show={getModalState(deleteRoleModal)}
                onActionHandler={removeRole}
                onCloseHandler={() => closeModal(deleteRoleModal)}
                loading={deleteLoading}
                title={t('role.prompt_delete')}
                actionButtonText={t('general.delete')}
                actionButtonVariant="danger"
            />
        </ContainerLarge>
    )
}

export default RoleEditor
