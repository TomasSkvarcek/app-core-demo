import axios from 'axios';
import { http_status_categories } from "@/src/core/constants/httpStatus";
import { showDefaultErrorAlert, showUnauthorizedAlert } from "@/src/core/helpers/alerts/errorAlert";
import { showLogoutAlert } from "@/src/core/helpers/alerts/infoAlert";
import {API_BASE_URL, API_URL_PREFIX} from "@/src/core/constants/api";

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
window.axios.defaults.baseURL = API_BASE_URL + API_URL_PREFIX;

export function setupAxiosInterceptors(logout) {
    window.axios.interceptors.response.use(
        response => response,
        error => {
            const request_status = error.response?.status;

            if (http_status_categories.unauthenticated.includes(request_status)) {
                logout(true);
                showLogoutAlert();
            } else if (request_status === http_status_categories.unauthorized) {
                logout(true);
                showUnauthorizedAlert();
            } else if (
                http_status_categories.server_error.includes(request_status)
                || http_status_categories.other_errors.includes(request_status)
            ) {
                showDefaultErrorAlert();
            }

            return Promise.reject(error);
        },
    );
}
