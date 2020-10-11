import React, {useRef} from "react";
import navigationMenuModel from "./navigationMenu";
import {Menubar} from "primereact/menubar";
import logo from  "../images/placeholder_logo.png"
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import rootStoreContext from "../../stores/rootStore";
import Login from "../../../features/auth/Login";
import {observer} from "mobx-react-lite";
import {OverlayPanel} from "primereact/overlaypanel";

const Navbar = () => {
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    const {isLoggedIn, user, logout} = useContext(rootStoreContext).authStore;
    
    const loggedInModalItemsOptions = useRef<any>(null);

    const authButtons = () => {
        if(isLoggedIn){
            return (
                <div className={"avatar-section hide-sm hide-md"}>
                        <div className={"p-d-flex p-flex-wrap p-jc-between p-ai-center"}>
                            <div onClick={(event) => loggedInModalItemsOptions.current.toggle(event)} style={{marginRight: "0.5em"}}>
                                <span  style={{fontSize: "0.9em"}}>{user?.username} <i className="pi pi-chevron-down" style={{float: "right", fontSize: "0.9em", color: "#777777", marginTop: "0.5em"}} /></span>
                                <OverlayPanel ref={loggedInModalItemsOptions} >
                                    <div className={"logged-in-options"}>
                                            <li><Button icon={"pi pi-user"} label={"View Profile"} className={"p-button-sm p-button-text p-button-plain"} style={{width: "100%"}} /></li>
                                            <li><Button icon={"pi pi-power-off"} label={"Logout"} className={"p-button-sm p-button-text p-button-plain"}  style={{width: "100%"}} onClick={() => logout()} /></li>
                                    </div>
                                </OverlayPanel>
                                <span className={"followers-count"}>{user?.email}</span>
                            </div>
                            <img src={user?.gravatarProfileImage} alt={"username-clip"} className={"avatar-image"} />
                        </div>
                    </div>
            )
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