import {useContext} from "react";
import {GlobalContext} from "@/src/core/contexts/GlobalContext";
import {isObjectEmpty} from "@/src/core/helpers/objectHelper";
import {useCustomAuthorization} from "@/src/config/authorization/useCustomAuthorization.jsx";

export function useAuthorization() {
    const {
        useBackendPrivileges,
        allowCustomAuthorization,
        runCustomAuthorization
    } = useCustomAuthorization();
    const { globalContextData } = useContext(GlobalContext);
    const user = globalContextData?.loggedInUserData?.user;
    const user_privileges = globalContextData?.loggedInUserData?.privileges;

    function can(privilege, context = null) {
        if (useBackendPrivileges) {
            if (isObjectEmpty(user_privileges) || !user_privileges.hasOwnProperty(privilege)) {
                return false;
            }
        }

        if (allowCustomAuthorization) {
            const result = runCustomAuthorization(privilege, context);
            if (result !== 0) {
                return result;
            }
        }

        if (useBackendPrivileges) {
            if (user_privileges[privilege]) {
                return checkContextConditions(privilege, context);
            }
        }

        return true;
    }

    function canAny(privileges) {
        for (const privilege of privileges) {
            if (can(privilege.privilege, privilege.context)) {
                return true;
            }
        }

        return false;
    }

    function canAll(privileges) {
        for (const privilege of privileges) {
            if (!can(privilege.privilege, privilege.context)) {
                return false;
            }
        }

        return true;
    }

    function checkContextConditions(privilege, context = null) {
        if (isObjectEmpty(context)) {
            return false;
        }

        const rules = user_privileges[privilege]
        const group_condition_results = {};

        Object.entries(rules).forEach(([key, group_rules]) => {
            group_condition_results[key] = true;

            for (const condition of group_rules) {
                if (user?.[condition.authenticable_field] !== context?.[condition.context_field]) {
                    group_condition_results[key] = false;
                    break;
                }
            }
        });

        return Object.values(group_condition_results).includes(true);

    }

    return { can, canAny, canAll }
}
