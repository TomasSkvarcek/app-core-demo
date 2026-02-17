import {useEffect, useState} from "react";
import {showSuccessMessage} from "@/src/core/helpers/alerts/successMessage";
import {useTranslation} from "react-i18next";
import {useRoleList} from "@/src/domain/access_control/hooks/useRoleList";

export function useRoleEditor() {
    const {t} = useTranslation()
    const [errors, setErrors] = useState({})
    const [roleLoading, setRoleLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [roleData, setRoleData] = useState({})
    const [privileges, setPrivileges] = useState([])
    const [selectedRoleID, setSelectedRoleID] = useState(null)
    const {roles, getRoles, loading: roleListLoading} = useRoleList()

    useEffect( () => {
        const controller = new AbortController()
        getPrivileges({ signal: controller.signal })
        return () => controller.abort()
    }, [])

    async function createRole(data) {
        setFormLoading(true)
        setErrors({})

        return axios.post('roles/create', data)
            .then(() => {
                showSuccessMessage(t('role.created'))
                clearSelectedRole()
                getRoles()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setFormLoading(false))
    }

    async function updateRole(data) {
        setFormLoading(true)
        setErrors({})

        return axios.put('roles/update/'+ selectedRoleID, data)
            .then(response => {
                showSuccessMessage(t('role.updated'))
                prepareRoleData(response.data)
                getRoles()
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setFormLoading(false))
    }

    async function deleteRole(role_id) {
        setDeleteLoading(true)

        await axios.delete('roles/delete/' + role_id)
            .then(() => {
                showSuccessMessage(t('role.deleted'))
                clearSelectedRole()
            })
            .finally(() => setDeleteLoading(false))

        await getRoles()
    }

    async function getRole(role_id, { signal } = {}) {
        setRoleLoading(true)

        await axios.get( 'roles/get/'+ role_id, { signal })
            .then(response => {
                const role = response.data
                prepareRoleData(role)
                setSelectedRoleID(role.id)
            })

        setRoleLoading(false)
    }

    async function getPrivileges({ signal } = {}) {
        setRoleLoading(true)
        await axios.get('privileges', { signal })
            .then(response => {
                setPrivileges(response.data)
            })
        setRoleLoading(false)
    }

    async function selectRole(role_id) {
        setErrors({})
        await getRole(role_id)
    }

    function clearSelectedRole() {
        setRoleData({})
        setSelectedRoleID(null)
        setErrors({})
    }

    function prepareRoleData(role_api_data) {
        const privileges = []

        role_api_data.privileges?.map(privilege => {
            privileges.push(privilege.id)
        })
        delete role_api_data.privileges
        role_api_data.privilege_ids = privileges
        setRoleData(role_api_data)
    }

    return {
        role: { roleData, setRoleData },
        privileges,
        roles,
        selectRole,
        selectedRoleID,
        setSelectedRoleID,
        clearSelectedRole,
        createRole,
        updateRole,
        deleteRole,
        getRole,
        roleLoading,
        formLoading,
        deleteLoading,
        roleListLoading,
        errors
    }
}
