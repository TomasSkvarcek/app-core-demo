import PageTitle from "@/src/core/components/text/PageTitle.jsx";
import {useTranslation} from "react-i18next";

function Dashboard() {
    const {t} = useTranslation()

    return (
        <PageTitle text={ t('general.app_name') } />
    )
}

export default Dashboard
