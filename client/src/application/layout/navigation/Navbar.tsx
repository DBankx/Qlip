﻿import React, {useRef} from "react";
import {Menubar} from "primereact/menubar";
import logo from  "../images/logo.png"
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import {useContext} from "react";
import rootStoreContext from "../../stores/rootStore";
import Login from "../../../features/auth/Login";
import {observer} from "mobx-react-lite";
import {OverlayPanel} from "primereact/overlaypanel";
import Register from "../../../features/auth/Register";
import {history} from "../../../index";

const Navbar = () => {
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    const {isLoggedIn, user, logout} = useContext(rootStoreContext).authStore;
    const loggedInModalItemsOptions = useRef<any>(null);
    
    //navigation menu
    const navigationMenuModel = [
        {
            label: 'Browse Qlips',
            icon: 'pi pi-fw pi-video',
            items: [
                {
                    label: 'All',
                    icon: 'pi pi-globe',
                    command: () => history.push("/")
                },
                {
                    label: 'Search',
                    icon: 'pi pi-search'
                },
                {
                    separator: true
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-plus',
                    command: () => history.push("/create")
                }
            ]
        },
        {
            label: 'Game Library',
            icon: 'fas fa-gamepad',
            command: () => history.push("/games")
        },
        isLoggedIn ?
            {
                label: user?.username,
                icon: "pi pi-user",
                className: "hide-biggest",
                items: [
                    {
                        label: "View Profile",
                        icon: "pi pi-user-edit",
                        command: () => history.push(`/channel/${user?.username}`)
                    },
                    {
                        label: "Your history",
                        icon: "fas fa-history",
                        command: () => history.push("/history")
                    },
                    {
                        label: "Sign out",
                        icon: "pi pi-sign-out",
                        command: () => logout()
                    }
                ]
            } 
            :
        {
            label: "Join Qlip",
            icon: "pi pi-user",
            className: "hide-biggest",
            items: [
                {
                    label: "Register",
                    command: () => openAuthModal(<Register />)
                },
                {
                    label: "login",
                    command: () => openAuthModal(<Login/>)
                }
            ]
        },
        {
            label: "Settings",
            icon: "pi pi-cog",
            className: "hide-biggest",
            command: () => history.push("/settings")
        },
        {
            label: "Info",
            icon: "pi pi-info",
            className: "hide-biggest",
            items: [
                {
                    label: "About us",
                    icon: "pi pi-info-circle",
                    command: () => history.push("/about")
                },{
                label: "Contact us",
                    icon: "fas fa-envelope",
                    command: () => history.push("/contact")
                }
            ]
        }
    ];

    const authButtons = () => {
        if(isLoggedIn){
            return (
                <div className={"avatar-section hide-sm hide-md"}>
                        <div className={"p-d-flex p-flex-wrap p-jc-between p-ai-center"}>
                            <div onClick={(event) => loggedInModalItemsOptions.current.toggle(event)} style={{marginRight: "0.5em"}}>
                                <span  style={{fontSize: "0.9em"}}>{user?.username} <i className="pi pi-chevron-down" style={{float: "right", fontSize: "0.9em", color: "#777777", marginTop: "0.3em"}} /></span>
                                <OverlayPanel appendTo={document.body} ref={loggedInModalItemsOptions} >
                                    <div className={"logged-in-options"}>
                                            <li><Button icon={"pi pi-user"} label={"Your Channel"} className={"p-button-sm p-button-text p-button-plain"} style={{width: "100%"}}onClick={() => history.push(`/channel/${user!.username}`)} /></li>
                                        <li><Button icon={"fas fa-history"} label={"Your History"} className={"p-button-sm p-button-text p-button-plain"} style={{width: "100%"}}onClick={() => history.push(`/history`)} /></li>
                                            <li><Button icon={"pi pi-sign-out"} label={"Sign out"} className={"p-button-sm p-button-text p-button-plain"}  style={{width: "100%"}} onClick={() => logout()} /></li>
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
            <Button label={"Login"} style={{fontWeight: 600}} onClick={() => openAuthModal(<Login/>)}
                    className="p-button-outlined p-button-sm p-mr-3" icon={"pi pi-sign-in"}/>
            <Button label={"Sign up"} style={{fontWeight: 600}} onClick={() => openAuthModal(<Register />)} className={"p-button-sm"}/>
        </div>
            )
        }
    }
    
    return(
        <Menubar model={navigationMenuModel}  start={() => <Link to={"/"}><img alt={"logo"} src={logo} style={{marginLeft: "1em"}}  className="p-mr-2 main-logo"/></Link>} end={authButtons} />
    )
}

export default observer(Navbar);