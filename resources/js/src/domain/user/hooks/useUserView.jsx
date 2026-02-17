import {useEffect, useState} from "react";
import {showSuccessMessage} from "@/src/core/helpers/alerts/successMessage";
import {useSearch} from "@/src/core/hooks/useSearch";
import {useTranslation} from "react-i18next";

export function useUserView() {
    const {t} = useTranslation()
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [formLoading, setFormLoading] = useState(false)
    const {
        searchData,
        setSearchData,
        debouncedSearchData,
        setDebouncedSearchData,
        debouncedSearch,
        syncSearchData,
        setSyncSearchData,
        setSearchSync,
        setDebouncedSearchSync,
        clearSearch,
        pageChanged,
        handleSearch,
        handleSearchDebounced
    } = useSearch(500)

    useEffect(() => {
        const controller = new AbortController()
        getUsers({ signal: controller.signal })
        getRoles({ signal: controller.signal })
        return () => controller.abort()
    }, [])

    useEffect(() => {
        if (debouncedSearch === null) { // dont call on start
            return
        }

        getUsers({}, debouncedSearch)
    }, [debouncedSearch])

    useEffect(() => {
        if (searchData === null) {
            return
        }

        getUsers({}, searchData)
    }, [searchData])

    async function getRoles({ signal } = {}) {
        setLoading(true)
        await axios.get('roles', { signal })
            .then(response => {
                setRoles(response.data)
            })

        setLoading(false)
    }

    async function getUsers({ signal } = {}, data = null) {
        setLoading(true)

        await axios.post('users/view', data, { signal })
        .then(response => {
            setUsers(response.data)
        })

        setLoading(false)
    }

    async function deleteUser(user_id) {
        setFormLoading(true)

        return axios.delete('users/delete/' + user_id)
            .then(() => {
                showSuccessMessage(t('user.deleted'))
                getUsers()
                clearSearch()
            })
            .finally(() => setFormLoading(false))
    }

    return {
        users,
        roles,
        loading,
        formLoading,
        getUsers,
        deleteUser,
        searchData,
        setSearchData,
        debouncedSearchData,
        setDebouncedSearchData,
        debouncedSearch,
        syncSearchData,
        setSyncSearchData,
        setSearchSync,
        setDebouncedSearchSync,
        clearSearch,
        pageChanged,
        handleSearch,
        handleSearchDebounced
    }
}
