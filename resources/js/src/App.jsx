import React, {Suspense} from "react";
import ContentLoader from "@/src/core/components/core/ContentLoader";
import {useAuth} from "@/src/core/hooks/auth/useAuth.jsx";
import {setupAxiosInterceptors} from "@/src/core/functions/axiosSetup";
import GlobalContextProvider from "@/src/core/contexts/providers/GlobalContextProvider.jsx";
import {useGlobalContextDataLoader} from "@/src/core/hooks/useGlobalContextDataLoader.jsx";
import Routing from "@/src/Routing.jsx";

function App() {
    const { logout } = useAuth();
    setupAxiosInterceptors(logout);
    const {globalContextData, dataLoading} = useGlobalContextDataLoader();

    return (
        <Suspense fallback={ <ContentLoader loading={true} delay={0} fullscreen={true} /> }>
            <GlobalContextProvider data={globalContextData}>
                <ContentLoader loading={dataLoading} delay={0} fullscreen={true} />
                <Routing />
            </GlobalContextProvider>
        </Suspense>
    )
}

export default App
