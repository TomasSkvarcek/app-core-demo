import {GlobalContext} from "@/src/core/contexts/GlobalContext";
import {useEffect, useState} from "react";

function GlobalContextProvider({
    children,
    data = {}
}) {
    const [globalContextData, setGlobalContextData] = useState(data)

    useEffect(() => {
        setGlobalContextData(data)
    }, [data]);

    function updateGlobalContextData(data) {
        setGlobalContextData(data)
    }

    return (
        <GlobalContext.Provider value={{ globalContextData, updateGlobalContextData }}>
            { children }
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider


