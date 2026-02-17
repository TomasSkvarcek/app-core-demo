import Menu from "@/src/domain/shared/views/Menu.jsx";
import ContentContainer from "@/src/domain/shared/views/ContentContainer.jsx";
import React from "react";

function UnauthenticatedLayout() {
    return (
        <>
            <Menu />
            <ContentContainer />
        </>
    )
}

export default UnauthenticatedLayout;
