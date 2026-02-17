import { NavLink } from 'react-router-dom'
import {route} from '../../routing'

function NamedLink({
    link,
    cssClass,
    children
}) {
    return (
        <NavLink
            end
            to={ route(link) }
            className={ cssClass }
        >
            { children }
        </NavLink>
    )
}

export default NamedLink
