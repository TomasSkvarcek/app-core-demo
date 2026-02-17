import ButtonAction from "@/src/core/components/form/buttons/ButtonAction";
import {useTranslation} from "react-i18next";

function PageTitleBackButton({ action, disabled }) {
    const {t} = useTranslation()

    return (
        <span className="float-end">
            <ButtonAction
                variant="secondary"
                action={ action }
                disabled={ disabled }
            >
                <i className="fa fa-arrow-left" aria-hidden="true" title={t('general.back') }></i>
            </ButtonAction>
        </span>
    )
}

export default PageTitleBackButton
