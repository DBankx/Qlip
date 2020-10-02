import React, { Fragment } from "react";
import navigationMenuModel from "./navigationMenu";
import {Menubar} from "primereact/menubar";
import logo from  "../images/placeholder_logo.png"
import {Button} from "primereact/button";


const authButtons = (
    <div >
    <Button label={"Login"} className="p-button-outlined p-button-sm p-mr-3" icon={"pi pi-user"}/>
    <Button label={"Sign up"} className={"p-button-sm"} />
    </div>
)

const Navbar = () => {
    return(
        <Menubar model={navigationMenuModel}  start={() => <img src={logo} height="40" className="p-mr-2"/>} end={() => authButtons} />
    )
}

export default Navbar;