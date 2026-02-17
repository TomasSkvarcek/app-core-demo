import {useLocation, useParams} from "react-router-dom";
import {route} from '../routing'

export function useRoute() {
    const location = useLocation()
    const {id} = useParams()

    function isRouteActive(route_path) {
        return route(route_path, {'id': id}) === location.pathname
    }

    function isAnyRouteActive(route_list) {
        const route_list_with_variables = []
        route_list.map(route_path => {
            const route_with_variables = route(route_path, {'id': id})
            route_list_with_variables.push(route_with_variables)
        })

        return route_list_with_variables.includes(location.pathname)
    }

    return {isRouteActive, isAnyRouteActive}
}
