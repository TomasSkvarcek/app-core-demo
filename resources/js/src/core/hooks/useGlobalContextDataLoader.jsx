import {useEffect, useState} from "react";
import {useLocalStorage} from "react-use-storage";
import {getGlobalContextDataRequests} from "@/src/config/requests/globalContexDataRequests.jsx";

export function useGlobalContextDataLoader() {
    const [globalContextData, setGlobalContextData] = useState({});
    const [dataLoading, setDataLoading] = useState(false);
    const [loggedInUser] = useLocalStorage('loggedInUser', false);

    useEffect(() => {
        if (loggedInUser) {
            const controller = new AbortController();
            loadGlobalContextData(controller.signal);
            return () => controller.abort();
        } else {
            setGlobalContextData({});
        }
    }, [loggedInUser]);

    async function loadGlobalContextData(signal) {
        const loadedData = {
            loggedInUserData: {}
        }

        setDataLoading(true);

        try {
            await Promise.all(getGlobalContextDataRequests(loadedData, signal));
        } finally {
            setDataLoading(false);
        }

        setGlobalContextData(loadedData);
    }

    return { globalContextData, dataLoading };
}
