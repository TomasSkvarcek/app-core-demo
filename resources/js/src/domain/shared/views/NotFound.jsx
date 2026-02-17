import {useTranslation} from "react-i18next";
import PageTitle from "@/src/core/components/text/PageTitle.jsx";

function NotFound() {
    const {t} = useTranslation()

    return (
        <div className="container">
            <div className="row" style={{height: '100vh'}}>
                <div className="col-12 text-center" style={{marginTop: '44vh'}}>
                    <PageTitle text={t('general.page_not_found')} />
                </div>
            </div>
        </div>
    )
}

export default NotFound
