function CardWrapper({children, title}) {
    return (
        <div className="card">
            {title && (
                    <div className="card-header">
                        { title }
                    </div>
                )
            }
            <div className="card-body">
                { children }
            </div>
        </div>
    )
}

export default CardWrapper
