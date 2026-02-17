import Swal from "sweetalert2";
import i18n from "i18next";

function showInfoAlert(title = null, text = null) {
    Swal.fire({
        icon: 'info',
        title: title,
        text: text,
    })
}

function showLogoutAlert() {
    showInfoAlert(i18n.t('auth.been_logged_out'), i18n.t('auth.session_expired_login_again'))
}

export { showInfoAlert, showLogoutAlert }
