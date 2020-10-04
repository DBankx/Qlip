import React from "react";
import {Menu} from "primereact/menu";
import {sidebarNavigationModel} from "./sidebarNavigationModel";

const Sidebar = () => {
    return (
            <Menu appendTo={document.body}  className={"main-sidebar p-d-none p-d-md-inline-flex"} model={sidebarNavigationModel} />
    )
}

export default Sidebar;