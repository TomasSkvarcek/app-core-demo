import Swal from "sweetalert2";
import i18n from "i18next";

function showErrorAlert(title = null, text = null) {
    Swal.fire({
        icon: 'error',
        title: title,
        text: text,
    })
}

function showDefaultErrorAlert() {
    showErrorAlert(i18n.t('general.error'), i18n.t('general.try_again'))
}

function showUnauthorizedAlert() {
    showErrorAlert(i18n.t('access_control.action_unauthorized'), i18n.t('access_control.action_missing_permission'))
}

export {showErrorAlert, showDefaultErrorAlert, showUnauthorizedAlert}
