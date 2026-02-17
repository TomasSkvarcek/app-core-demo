import ValidationError from "@/src/core/components/form/ValidationError";
import InputLabel from "@/src/core/components/form/inputs/InputLabel";

function InputText({
    id,
    type = 'text',
    name,
    value,
    label,
    onChangeHandler,
    onBlurHandler,
    dataKey,
    errors,
    disabled,
    cssClass,
    addCssClass,
    errorMessageCssClass,
    labelCssClass,
    placeholder,
    maxlength,
    readonly,
    required,
    size = 'small',
    setBottomMargin = true,
    showAsRequired = false,
    autoComplete = true,
}) {
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

    function handleChange(inputValue) {
        if (!onChangeHandler) {
            return;
        }

        onChangeHandler(inputValue, dataKey);
    }

    function handleBlur(inputValue) {
        if (!onBlurHandler) {
            return;
        }

        onBlurHandler(inputValue, dataKey);
    }

    return(
        <>
            {label && <InputLabel id={id} label={label} showAsRequired={showAsRequired} cssClass={labelCssClass} />}
            <input type={type}
                   id={id}
                   name={name}
                   value={ value ?? ''}
                   onChange={ event => handleChange(event.target.value)}
                   onBlur={event => handleBlur(event.target.value)}
                   disabled={ disabled }
                   readOnly={readonly}
                   required={required}
                   className={ cssClass ?? (errors?.length > 0 ? errorStyling : styling) }
                   placeholder={placeholder}
                   maxLength={maxlength}
                   autoComplete={autoComplete ? 'on' : 'off'}
            />
            {errors?.length > 0 && <ValidationError errors={ errors } cssClass={ errorMessageCssClass } />}
        </>
    )
}

export default InputText
