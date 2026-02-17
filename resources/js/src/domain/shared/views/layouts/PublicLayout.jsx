import Menu from "@/src/domain/shared/views/Menu.jsx";
import ContentContainer from "@/src/domain/shared/views/ContentContainer.jsx";
import React from "react";

function PublicLayout() {
    return (
        <>
            <Menu />
            <ContentContainer />
        </>
    )
}

export default PublicLayout;
