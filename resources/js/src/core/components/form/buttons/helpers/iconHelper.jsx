function getButtonIcon(type) {
    let variant;
    let icon;
    if (type === 'edit') {
        variant = 'primary'
        icon = (<i className="fa-regular fa-pen-to-square"></i>)
    } else if (type === 'detail') {
        variant = 'primary'
        icon = (<i className="fa-solid fa-magnifying-glass"></i>)
    } else if (type === 'delete') {
        variant = 'danger'
        icon = (<i className="fa-regular fa-trash-can"></i>)
    }

    return {icon, variant}
}

export {getButtonIcon}
