import {Link} from "react-router-dom";

function ButtonLink({
    variant = 'primary',
    children,
    link,
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
        <Link to={ link } className={ cssClass ?? styling } title={title}>
            { children }
        </Link>
    )
}

export default ButtonLink
