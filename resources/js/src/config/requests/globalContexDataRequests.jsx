import {getLoggedInUserSessionData} from "@/src/core/services/userService.jsx";

function getGlobalContextDataRequests(globalContextDataObj, requestAbortControllerSignal) {
    return [
        getLoggedInUserSessionData({ signal: requestAbortControllerSignal })
            .then(data => {
                globalContextDataObj.loggedInUserData = data;
            })
    ];
}

export {
    getGlobalContextDataRequests
}
