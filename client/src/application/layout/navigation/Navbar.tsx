import React from "react";
import navigationMenuModel from "./navigationMenu";
import {Menubar} from "primereact/menubar";
import logo from  "../images/placeholder_logo.png"
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import rootStoreContext from "../../stores/rootStore";
import Login from "../../../features/auth/Login";
import {observer} from "mobx-react-lite";

const Navbar = () => {
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;

    const authButtons = () => {
        if(isLoggedIn){
            return <Button label={"loggedIn"} />
        } else{
            return (
        <div className={"p-d-none p-d-md-inline-flex"}>
            <Button label={"Login"} onClick={() => openAuthModal(<Login/>)}
                    className="p-button-outlined p-button-sm p-mr-3" icon={"pi pi-user"}/>
            <Button label={"Sign up"} className={"p-button-sm"}/>
        </div>
            )
        }
    }
    
    return(
        <Menubar model={navigationMenuModel}  start={() => <Link to={"/"}><img alt={"logo"} src={logo} height="40" className="p-mr-2"/></Link>} end={authButtons} />
    )
}

export default observer(Navbar);