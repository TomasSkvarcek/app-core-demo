import NamedLink from "@/src/core/components/core/NamedLink.jsx";
import {useAuth} from "@/src/core/hooks/auth/useAuth.jsx";
import {useContext} from "react";
import {GlobalContext} from "@/src/core/contexts/GlobalContext.jsx";
import {useAuthorization} from "@/src/core/hooks/useAuthorization.jsx";
import privileges from "@/src/config/constants/privileges.jsx";
import { useTranslation } from 'react-i18next';
import {useRoute} from "@/src/core/hooks/useRoute.jsx";
import {routeNames} from "@/src/config/routing/routeNames.jsx";

function Menu() {
    const { logout, loggedInUser } = useAuth()
    const { globalContextData } = useContext(GlobalContext)
    const loggedInUserData = globalContextData?.loggedInUserData
    const { can } = useAuthorization()
    const { t } = useTranslation()
    const {isRouteActive, isAnyRouteActive} = useRoute()

    const routeGroups = {
        user: [routeNames.users_view, routeNames.user_create, routeNames.user_edit]
    }

    function authenticatedNav() {
        return (
            <>
                <NamedLink link={routeNames.dashboard} cssClass="navbar-brand">
                    { t('general.app_name') }
                </NamedLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {can(privileges.user_view) && (
                            <li className="nav-item">
                                <NamedLink link={routeNames.users_view} cssClass={isAnyRouteActive(routeGroups.user) ? 'nav-link active' :  'nav-link' }>
                                    { t('menu.users') }
                                </NamedLink>
                            </li>
                        )}
                        {can(privileges.role_setup) && (
                            <li className="nav-item">
                                <NamedLink link={routeNames.role_editor} cssClass={isRouteActive(routeNames.role_editor) ? 'nav-link active' :  'nav-link' }>
                                    { t('menu.roles') }
                                </NamedLink>
                            </li>
                        )}
                        {/*dropdown menu example*/}
                        {/*<li className="nav-item dropdown">*/}
                        {/*    <span className={ isAnyRouteActive([routeNames.users_view, routeNames.role_editor]) ? 'nav-link dropdown-toggle active show' : 'nav-link dropdown-toggle show' } role="button" data-bs-toggle="dropdown"*/}
                        {/*       aria-expanded="false">*/}
                        {/*        { t('menu.users') }*/}
                        {/*    </span>*/}
                        {/*    <ul className="dropdown-menu">*/}
                        {/*        <li>*/}
                        {/*            <NamedLink link={routeNames.users_view} cssClass={ isRouteActive(routeNames.users_view) ? 'dropdown-item active' :  'dropdown-item' }>*/}
                        {/*                { t('menu.users') }*/}
                        {/*            </NamedLink>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <NamedLink link={routeNames.role_editor} cssClass={ isRouteActive(routeNames.role_editor) ? 'dropdown-item active' :  'dropdown-item' }>*/}
                        {/*                { t('menu.roles') }*/}
                        {/*            </NamedLink>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*            <hr className="dropdown-divider" />*/}
                        {/*        </li>*/}
                        {/*        <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                        {/*    </ul>*/}
                        {/*</li>*/}
                    </ul>
                    <ul className="navbar-nav dropdown-menu-end mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false" title={ loggedInUserData?.user?.email }>
                                    <span className="fa-solid fa-user"></span> {t('menu.profile')}
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <span className="dropdown-item disabled">{ loggedInUserData?.user?.email }</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li >
                                    <NamedLink link={routeNames.password_change} cssClass={isRouteActive(routeNames.password_change) ? 'dropdown-item active' :  'dropdown-item' }>
                                        { t('menu.password_change') }
                                    </NamedLink>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={ () => logout(false) }>{ t('auth.logout') }</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    function guestNav() {
        return (
            <>
                <NamedLink link={routeNames.dashboard} cssClass="navbar-brand">
                    { t('general.app_name') }
                </NamedLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <ul className="navbar-nav dropdown-menu-end mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NamedLink link={routeNames.login} cssClass={isRouteActive(routeNames.login) ? 'nav-link active' : 'nav-link' }>
                                { t('auth.login') }
                            </NamedLink>
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary navbar-dark fixed-top">
            <div className="container-fluid">
                { loggedInUser ? authenticatedNav() : guestNav() }
            </div>
        </nav>
    )
}

export default Menu
