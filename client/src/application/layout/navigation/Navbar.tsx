import React, {useRef} from "react";
import {Menubar} from "primereact/menubar";
import logo from  "../images/placeholder_logo.png"
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
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Game Library',
            icon: 'pi pi-list',
            items: [
                {
                    label: 'View games',
                    icon: 'pi pi-fw pi-sitemap',
                    command: () => history.push("/games")
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            separator: true
        },
        isLoggedIn ?
            {
                label: user?.username,
                icon: "pi pi-user",
                className: "hide-bg",
                items: [
                    {
                        label: "View Profile",
                        icon: "pi pi-user-edit"
                    },
                    {
                        label: "Logout",
                        icon: "pi pi-power-off",
                        command: () => logout()
                    }
                ]
            } 
            :
        {
            label: "Join Qlip",
            icon: "pi pi-user",
            className: "hide-bg",
            items: [
                {
                    label: "Register",
                    command: () => openAuthModal(<Register />, "Join Qlip")
                },
                {
                    label: "login",
                    command: () => openAuthModal(<Login/>, "Sign In to Qlip")
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
            <Button label={"Login"} onClick={() => openAuthModal(<Login/>, "Sign In to Qlip")}
                    className="p-button-outlined p-button-sm p-mr-3" icon={"pi pi-user"}/>
            <Button label={"Sign up"} onClick={() => openAuthModal(<Register />, "Join Qlip")} className={"p-button-sm"}/>
        </div>
            )
        }
    }
    
    return(
        <Menubar model={navigationMenuModel}  start={() => <Link to={"/"}><img alt={"logo"} src={logo} height="40" className="p-mr-2"/></Link>} end={authButtons} />
    )
}

export default observer(Navbar);