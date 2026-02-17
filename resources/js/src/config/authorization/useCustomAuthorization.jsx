export function useCustomAuthorization() {
    const useBackendPrivileges = true;
    const allowCustomAuthorization = true;

    /* define custom authorization and return true/false
        or 0 if authorization process should normally continue after this function run
     */
    function runCustomAuthorization(privilege, context = null) {
        return 0;
    }

    return  {
        useBackendPrivileges,
        allowCustomAuthorization,
        runCustomAuthorization
    }
}
