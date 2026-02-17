import {useTranslation} from "react-i18next";

function DataViewTableNoData({colSpan}) {
    const {t} = useTranslation()

    return (
        <tr>
            <td colSpan={colSpan}>
                <h4 className="text-center mt-1">{t('general.no_data')}</h4>
            </td>
        </tr>
    )
}

export default DataViewTableNoData
