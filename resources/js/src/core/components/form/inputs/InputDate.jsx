import ValidationError from "@/src/core/components/form/ValidationError";
import InputLabel from "@/src/core/components/form/inputs/InputLabel";
import DatePicker from "react-datepicker";
import {date_picker_date_format, date_picker_datetime_format, time_format} from "@/src/config/constants/date.jsx";
import {useTranslation} from "react-i18next";
import {formatDateTimeInput} from "@/src/core/helpers/dateHelper.jsx";

function InputDate({
    id,
    value,
    label,
    onChangeHandler,
    dataKey,
    errors,
    disabled,
    cssClass,
    addCssClass,
    errorMessageCssClass,
    labelCssClass,
    placeholder,
    size = 'small',
    setBottomMargin = true,
    showAsRequired = false,
    returnDateString = true,
    showTimeSelect = false,
    timeFormat = time_format,
    timeIntervals = 30,
    minDate,
    maxDate,
    filterDate,
    filterTime,
    openToDate
}) {
    const {t} = useTranslation();

    let dateFormat = date_picker_date_format;
    if (showTimeSelect) {
        dateFormat = date_picker_datetime_format;
    }

    let styling = 'form-control '
    let errorStyling = 'form-control is-invalid '

    if (size === 'small') {
        styling += 'form-control-sm '
        errorStyling += 'form-control-sm '
    }
    if (setBottomMargin) {
        styling += 'mb-1 '
        errorStyling += 'mb-1 '
    }
    if (addCssClass) {
        styling += ' ' + addCssClass;
        errorStyling += ' ' +  addCssClass;
    }

    function handleChange(date) {
        if (!onChangeHandler) {
            return;
        }

        if (returnDateString) {
            date = formatDateTimeInput(date);
        }

        onChangeHandler(date, dataKey);
    }

    return(
        <>
            {label && <InputLabel id={id} label={label} showAsRequired={showAsRequired} cssClass={labelCssClass} />}
            <div className={errors?.length > 0 ? 'is-invalid' : ''}>
                <DatePicker
                    id={id}
                    isClearable
                    selected={value ? new Date(value) : null}
                    onChange={(date) => handleChange(date)}
                    className={ cssClass ?? (errors?.length > 0 ? errorStyling : styling) }
                    dateFormat={dateFormat}
                    placeholderText={placeholder}
                    disabled={disabled}
                    showTimeSelect={showTimeSelect}
                    timeFormat={timeFormat}
                    timeIntervals={timeIntervals}
                    timeCaption={t('general.time_picker_caption')}
                    minDate={minDate}
                    maxDate={maxDate}
                    filterDate={filterDate}
                    filterTime={filterTime}
                    autoComplete="off"
                    openToDate={openToDate}
                    showDateSelect={false}
                />
            </div>
            {errors?.length > 0 && <ValidationError errors={ errors } cssClass={ errorMessageCssClass } />}
        </>
    )
}

export default InputDate
