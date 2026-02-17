function PageTitle({text, children, cssClass}) {
    return (
        <h2 className={cssClass}>{ text }{ children }</h2>
    )
}

export default PageTitle
