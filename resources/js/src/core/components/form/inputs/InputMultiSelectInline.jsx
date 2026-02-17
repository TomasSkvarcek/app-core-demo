import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Message from "@/src/core/components/text/Message";

function InputMultiSelectInline({
    id,
    options,
    canSelectAll,
    optionValueKey = 'value',
    optionNameKey = 'name',
    values,
    label,
    onChangeHandler,
    dataKey,
    errors,
    disabled = false
}) {
    const {t} = useTranslation()
    const [selectAll, setSelectAll] = useState(false)

    useEffect(() => {
        setSelectAll(options?.length > 0 && values?.length === options?.length)
    }, [options, values]);

    function handleChange(value) {
        if (!onChangeHandler) {
            return;
        }

        const select_values = values ? [...values] : []
        const index = select_values.indexOf(value)
        if (index < 0) {
            select_values.push(value)
        } else {
            select_values.splice(index, 1);
        }
        if (select_values.length === options?.length) {
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }

        onChangeHandler(select_values, dataKey)
    }

    function handleSelectAll() {
        if (!onChangeHandler) {
            return;
        }

        const selected = !selectAll
        setSelectAll(selected)
        const select_values = []
        if (options?.length > 0 && selected) {
            options.map((option) => {
                select_values.push(option[optionValueKey])
            })
        }
        onChangeHandler(select_values, dataKey)
    }

    function renderOption(value, name) {
        return (
            <div className="form-check" key={value}>
                <input className="form-check-input" type="checkbox"
                       id={id + '-' + value}
                       value={value}
                       onChange={() => handleChange(value)}
                       checked={values?.length > 0 ? values.includes(value) : false}
                       disabled={disabled}
                />
                <label className="form-check-label" htmlFor={id + '-' + value}>
                    {name}
                </label>
            </div>
        )
    }

    function renderSelectAllOption() {
        return (
            <div className="form-check" key={id + '-select-all'}>
                <input className="form-check-input" type="checkbox"
                       id={id + '-select-all'}
                       checked={selectAll}
                       onChange={handleSelectAll}
                       disabled={disabled}
                />
                <label className="form-check-label" htmlFor={id + '-select-all'}>
                    {t('general.select_all')}
                </label>
            </div>
        )
    }

    return(
        <>
            {label && <h4>{label}</h4>}
            {errors?.length > 0 && (
                <Message type="error">
                    { errors.map((error, index) => {
                        return (<div key={ index }>{ error }</div>)
                    }) }
                </Message>
            ) }
            {canSelectAll && renderSelectAllOption()}
            {options?.length > 0 && options.map((option) => {
                return renderOption(option[optionValueKey], option[optionNameKey])
            })}
        </>
    )
}

export default InputMultiSelectInline
