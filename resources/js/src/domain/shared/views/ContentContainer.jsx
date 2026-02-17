import {Outlet} from "react-router-dom";

function ContentContainer() {
    return (
        <div className="container mt-2 mb-5" style={{paddingTop: '60px'}}>
            <Outlet />
        </div>
    )
}

export default ContentContainer
