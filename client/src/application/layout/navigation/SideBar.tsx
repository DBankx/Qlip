import React from "react";
import {Menu} from "primereact/menu";
import {sideBarMenu} from "./sidebarMenu";

const SideBar = () => {
    return (
        <div className={"main-sidebar"}>
            <Menu className={"p-d-none p-d-md-inline-flex"} style={{position: "fixed"}} model={sideBarMenu} />
        </div>
        
    )
}

export default SideBar;