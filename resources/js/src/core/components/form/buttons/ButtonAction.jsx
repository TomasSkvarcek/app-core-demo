import IconSpinner from "@/src/core/components/core/IconSpinner";

function ButtonAction({
    type = 'button',
    variant = 'primary',
    children,
    action,
    disabled = false,
    loading = false,
    cssClass,
    addCssClass,
    size = 'normal',
    title
}) {
    let styling = 'btn btn-primary '
    if (variant === 'secondary') {
        styling = 'btn btn-secondary '
    } else if (variant === 'danger') {
        styling = 'btn btn-danger '
    } else if (variant === 'success') {
        styling = 'btn btn-success '
    }

    if (size === 'small') {
        styling += 'btn-sm '
    }
    if (addCssClass) {
        styling += addCssClass + ' '
    }

    return (
        <button type={ type } onClick={ action } className={ cssClass ?? styling } disabled={ disabled || loading } title={title}>
            { loading && <IconSpinner /> }
            { children }
        </button>
    )
}

export default ButtonAction
