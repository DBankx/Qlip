import React from "react";
import {Menu} from "primereact/menu";
import {sidebarNavigationModel} from "./sidebarNavigationModel";

const Sidebar = () => {
    return (
            <Menu appendTo={document.body} style={{position: "fixed"}}  className={"main-sidebar p-d-none p-d-md-none p-d-lg-inline-flex"} model={sidebarNavigationModel} />
    )
}

export default Sidebar;