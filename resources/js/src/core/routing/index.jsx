import {isObjectEmpty} from "@/src/core/helpers/objectHelper";

function route(url, route_params = {}, url_params = {}) {
    for (let prop in route_params) {
        if (Object.prototype.hasOwnProperty.call(route_params, prop)) {
            url = url.replace(`:${prop}`, route_params[prop])
        }
    }
    if (!isObjectEmpty(url_params)) {
        url = url + '?'
        for (let prop in url_params) {
            if (Object.prototype.hasOwnProperty.call(url_params, prop) && typeof url_params[prop] !== 'undefined' && url_params[prop] !== null) {
                url = url + prop + '=' + url_params[prop] + '&'
            }
        }
        url = url.slice(0, -1)
    }

    return url
}

export { route }
