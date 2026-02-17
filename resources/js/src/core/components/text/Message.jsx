function Message({ type = 'success', children }) {
    let alertClass = 'alert-success'
    if (type === 'error') {
        alertClass = 'alert-danger'
    } else if (type === 'info') {
        alertClass = 'alert-primary'
    } else if (type === 'warning') {
        alertClass = 'alert-warning'
    }

    return (
        <div className={'alert fade show text-center ' + alertClass} role="alert">
            { children }
        </div>
    )
}

export default Message
