function InputLabel({id, label, showAsRequired, cssClass}) {

    return(
        <label htmlFor={id} className={cssClass ?? "form-label"}>{label}{showAsRequired ? '*' : ''}</label>
    )
}

export default InputLabel
