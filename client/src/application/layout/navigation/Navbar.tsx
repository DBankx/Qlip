import React from "react";
import navigationMenuModel from "./navigationMenu";
import {Menubar} from "primereact/menubar";
import logo from  "../images/placeholder_logo.png"
import {Button} from "primereact/button";
import {Link} from "react-router-dom";


const authButtons = (
    <div className={"p-d-none p-d-md-inline-flex"}>
    <Button label={"Login"} className="p-button-outlined p-button-sm p-mr-3" icon={"pi pi-user"}/>
    <Button label={"Sign up"} className={"p-button-sm"} />
    </div>
)

const Navbar = () => {
    return(
        <Menubar model={navigationMenuModel}  start={() => <Link to={"/"}><img alt={"logo"} src={logo} height="40" className="p-mr-2"/></Link>} end={() => authButtons} />
    )
}

export default Navbar;