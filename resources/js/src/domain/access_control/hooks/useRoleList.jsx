import {useEffect, useState} from "react";

export function useRoleList() {
    const [loading, setLoading] = useState(false)
    const [roles, setRoles] = useState([])

    useEffect( () => {
        const controller = new AbortController()
        getRoles({ signal: controller.signal })
        return () => controller.abort()
    }, [])

    async function getRoles({ signal } = {}) {
        setLoading(true)

        await axios.get('roles/view', { signal })
            .then(response => {
                setRoles(response.data)
            })

        setLoading(false)
    }

    return {roles, getRoles, loading}
}
