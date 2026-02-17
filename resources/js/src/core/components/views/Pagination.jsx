function Pagination({
    paginationData,
    pageChangedHandler,
}) {
    function getPaginationCss(link) {
        let css_class = 'page-item '
        if (link.url === null) {
            css_class = css_class + 'disabled '
        }
        if (link.active === true) {
            css_class = css_class + 'active '
        }

        return css_class
    }

    function pageChanged(url) {
        if (!url) {
            return;
        }
        const fullUrl = new URL(url);
        const page = fullUrl.searchParams.get('page')
        pageChangedHandler(page)
    }

    return (
        <>
            {
                paginationData.length > 3 &&
                <nav>
                    <ul className="pagination pagination-sm">
                        {
                            paginationData.map((link, index) => {
                                return (
                                    <li key={index} className={ getPaginationCss(link) }>
                                        <button onClick={() => pageChanged(link.url)} className="page-link" dangerouslySetInnerHTML={{__html: link.label}} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            }
        </>
    )
}

export default Pagination
