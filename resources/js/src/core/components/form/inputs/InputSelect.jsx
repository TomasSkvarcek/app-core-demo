import ValidationError from "@/src/core/components/form/ValidationError";
import InputLabel from "@/src/core/components/form/inputs/InputLabel";

function InputSelect({
    id,
    options,
    emptyOption,
    optionValueKey = 'value',
    optionNameKey = 'name',
    name,
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
    required,
    size = 'small',
    setBottomMargin = true,
    showAsRequired = false,
    autoComplete = false,
 }) {
    let styling = 'form-select '
    let errorStyling = 'form-select is-invalid '

    if (size === 'small') {
        styling += 'form-select-sm '
        errorStyling += 'form-select-sm '
    }
    if (setBottomMargin) {
        styling += 'mb-1 '
        errorStyling += 'mb-1 '
    }
    if (addCssClass) {
        styling += ' ' + addCssClass;
        errorStyling += ' ' +  addCssClass;
    }

    function renderOption(value, name) {
        return <option value={value} key={value}>{name}</option>
    }

    function handleChange(inputValue) {
        if (!onChangeHandler) {
            return;
        }

        onChangeHandler(inputValue, dataKey);
    }

    return(
        <>
            {label && <InputLabel id={id} label={label} showAsRequired={showAsRequired} cssClass={labelCssClass} />}
            <select
                id={id}
                name={name}
                value={ value ?? ''}
                onChange={ event => handleChange(event.target.value)}
                disabled={ disabled }
                required={required}
                className={ cssClass ?? (errors?.length > 0 ? errorStyling : styling) }
                autoComplete={autoComplete ? 'on' : 'off'}
            >
                {emptyOption && renderOption('', emptyOption)}
                {options?.length > 0 && options.map((option) => {
                    return renderOption(option[optionValueKey], option[optionNameKey])
                })}
            </select>
            {errors?.length > 0 && <ValidationError errors={ errors } cssClass={ errorMessageCssClass } />}
        </>
    )
}

export default InputSelect
