import i18n from "i18next";

function getBoolSelectOptions() {
    return [
        {value: 't', name: i18n.t('general.yes')},
        {value: 'f', name: i18n.t('general.no')}
    ]
}

export {getBoolSelectOptions}
