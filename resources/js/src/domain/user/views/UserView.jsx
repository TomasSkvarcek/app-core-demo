import {useUserView} from "@/src/domain/user/hooks/useUserView";
import ContentLoader from "@/src/core/components/core/ContentLoader";
import {route} from "../../../core/routing";
import {useContext, useState} from "react";
import InputText from "@/src/core/components/form/inputs/InputText";
import InputSelect from "@/src/core/components/form/inputs/InputSelect";
import InputMultiSelect from "@/src/core/components/form/inputs/InputMultiSelect";
import InputDate from "@/src/core/components/form/inputs/InputDate";
import Pagination from "@/src/core/components/views/Pagination";
import ActionModal from "@/src/core/components/modal/ActionModal";
import {useModal} from "@/src/core/hooks/components/useModal";
import PageTitle from "@/src/core/components/text/PageTitle";
import DataViewTable from "@/src/core/components/blocks/DataViewTable";
import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import ButtonLink from "@/src/core/components/form/buttons/ButtonLink";
import {useAuthorization} from "@/src/core/hooks/useAuthorization";
import privileges from "@/src/config/constants/privileges.jsx";
import {useTranslation} from "react-i18next";
import {GlobalContext} from "@/src/core/contexts/GlobalContext";
import DataViewTableHeader from "@/src/core/components/blocks/DataViewTableHeader";
import DataViewTableBody from "@/src/core/components/blocks/DataViewTableBody";
import NoWrapTableCol from "@/src/core/components/blocks/NoWrapTableCol";
import HeaderTh from "@/src/core/components/blocks/HeaderTh";
import DataViewTableNoData from "@/src/core/components/blocks/DataViewTableNoData";
import {getBoolSelectOptions} from "@/src/core/helpers/inputHelper";
import ButtonIconConfigurableLink from "@/src/core/components/form/buttons/ButtonIconConfigurableLink";
import ButtonIconConfigurableAction from "@/src/core/components/form/buttons/ButtonIconConfigurableAction";
import {formatDateTimeOutput} from "@/src/core/helpers/dateHelper";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function UserView() {
    const {t} = useTranslation()
    const {
        users,
        roles,
        loading,
        formLoading,
        deleteUser,
        searchData,
        debouncedSearchData,
        clearSearch,
        pageChanged,
        handleSearch,
        handleSearchDebounced
    } = useUserView()
    const { can } = useAuthorization()
    const {openModal, closeModal, getModalState} = useModal()
    const [deleteUserId, setDeleteUserId] = useState(null)
    const { globalContextData, updateGlobalContextData } = useContext(GlobalContext)
    const loggedInUserData = globalContextData?.loggedInUserData
    const deleteUserModal = 'delete-user'
    const activeSelectOptions = getBoolSelectOptions()

    function openUserDeleteModal(user_id) {
        setDeleteUserId(user_id)
        openModal(deleteUserModal)
    }

    async function removeUser() {
        await deleteUser(deleteUserId)
        closeModal(deleteUserModal)
    }

    function renderTable() {
        return (
            <>
                <DataViewTable>
                    <DataViewTableHeader>
                        <tr>
                            <th>
                                <InputText
                                    id="search.email"
                                    type="text"
                                    value={debouncedSearchData?.search?.email}
                                    onChangeHandler={handleSearchDebounced}
                                    dataKey="email"
                                    placeholder={t('user.email')}
                                />
                            </th>
                            <th>
                                <InputText
                                    id="search.first_name"
                                    type="text"
                                    value={debouncedSearchData?.search?.first_name}
                                    onChangeHandler={handleSearchDebounced}
                                    dataKey="first_name"
                                    placeholder={t('user.first_name')}
                                />
                            </th>
                            <th>
                                <InputText
                                    id="search.last_name"
                                    type="text"
                                    value={debouncedSearchData?.search?.last_name}
                                    onChangeHandler={handleSearchDebounced}
                                    dataKey="last_name"
                                    placeholder={t('user.last_name')}
                                />
                            </th>
                            <th>
                                <InputMultiSelect
                                    id="search.roles"
                                    options={roles}
                                    values={debouncedSearchData?.search?.role_ids}
                                    optionValueKey="id"
                                    optionNameKey="name"
                                    onChangeHandler={handleSearchDebounced}
                                    dataKey="role_ids"
                                    label={t('user.roles')}
                                    canSelectAll={true}
                                />
                            </th>
                            <th>
                                <InputDate
                                    id="search.created_at"
                                    value={searchData?.search?.created_at}
                                    onChangeHandler={handleSearch}
                                    dataKey="created_at"
                                    placeholder={t('user.created_at')}
                                />
                            </th>
                            <th>
                                <InputSelect
                                    id="search.active"
                                    options={activeSelectOptions}
                                    emptyOption={t('user.active')}
                                    value={searchData?.search?.active}
                                    onChangeHandler={handleSearch}
                                    dataKey="active"
                                />
                            </th>
                            <th className="text-end">
                                <div className="mb-1">
                                    <ButtonAction
                                        variant="secondary"
                                        action={clearSearch}
                                        size="small"
                                        disabled={loading}
                                    >
                                        { t('general.clear_filter') }
                                    </ButtonAction>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <HeaderTh width="15%">{t('user.email')}</HeaderTh>
                            <HeaderTh width="12%">{t('user.first_name')}</HeaderTh>
                            <HeaderTh width="12%">{t('user.last_name')}</HeaderTh>
                            <HeaderTh width="26%">{t('user.roles')}</HeaderTh>
                            <HeaderTh width="15%">{t('user.created_at')}</HeaderTh>
                            <HeaderTh width="10%">{t('user.active')}</HeaderTh>
                            <HeaderTh width="10%">{t('general.action')}</HeaderTh>
                        </tr>
                    </DataViewTableHeader>
                    <DataViewTableBody>
                        <ContentLoader loading={loading} />
                        {
                            users.data?.length > 0 ? renderData() : <DataViewTableNoData colSpan={7} />
                        }
                    </DataViewTableBody>
                </DataViewTable>
                { users.data?.length > 0 && <Pagination paginationData={users.links} pageChangedHandler={pageChanged} /> }

                {/* Modals */}
                <ActionModal
                    show={getModalState(deleteUserModal)}
                    onActionHandler={removeUser}
                    onCloseHandler={() => closeModal(deleteUserModal)}
                    loading={formLoading}
                    title={t('user.prompt_delete')}
                    actionButtonText={t('general.delete')}
                    actionButtonVariant="danger"
                />
            </>
        )
    }

    function renderData() {
        return (
            <>
                { users.data.map(user => {
                    return (
                        <tr key={ user.id }>
                            <td>{ user.email }</td>
                            <td>{ user.first_name }</td>
                            <td>{ user.last_name }</td>
                            <td>
                                { user.roles.map((role, index) => {
                                    return (
                                        (index !== 0 ? ' | ' : '') + role.name
                                    )
                                })}
                            </td>
                            <td>{ formatDateTimeOutput(user.created_at) }</td>
                            <td>{ user.active === 't' ? t('general.yes') : t('general.no') }</td>
                            <NoWrapTableCol>
                                {can(privileges.user_edit) && (
                                    <ButtonIconConfigurableLink
                                        type="edit"
                                        link={ route(routeNames.user_edit, {id: user.id}) }
                                        size="small"
                                        title={t('general.edit')}
                                        addCssClass="me-2"
                                    />
                                )}
                                {(user.id !== loggedInUserData?.user?.id) && can(privileges.user_delete) && (
                                    <ButtonIconConfigurableAction
                                        type="delete"
                                        action={ () => openUserDeleteModal(user.id) }
                                        size="small"
                                        title={t('general.delete')}
                                    />
                                )}
                            </NoWrapTableCol>
                        </tr>
                    )
                }) }
            </>
        )
    }

    return (
        <>
            <PageTitle text={t('user.view')} />
            {can(privileges.user_create) && (
                <ButtonLink link={ route(routeNames.user_create) }>
                    {t('user.add')}
                </ButtonLink>
            )}
            { renderTable() }
        </>
    )
}

export default UserView
