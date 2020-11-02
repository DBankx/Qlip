import React, {FormEvent, Fragment, useContext, useRef, useState} from "react";
import {Toolbar} from "primereact/toolbar"
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {history} from "../../../index";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../stores/rootStore";
import Register from "../../../features/auth/Register";
import Login from "../../../features/auth/Login";

const Toolbars: React.FC<RouteComponentProps> = ({location}) => {
    const {isLoggedIn, user, logout} = useContext(rootStoreContext).authStore;
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    // placeholder form state managment
    const [form, setForm] = useState("");

    // placeholder for more menu items
    const moreMenuItems =  [
        {
            label: "User",
           items:[
               {
                   label: "Your channel",
                   icon: "pi pi-user",
                   command: isLoggedIn && user ? () => history.push(`/channel/${user.username}`) : () => openAuthModal(<Login />, "Sign in to qlip")
               },
               {
                   label: isLoggedIn && user ? "Account settings" : "Create Account",
                   icon: "pi pi-user-plus",
                   command: isLoggedIn && user ? () => alert("logged in")  : () => openAuthModal(<Register />, "Join Qlip")
               },
               {
                   label: "Sign out",
                   icon: "pi pi-sign-out",
                   command: isLoggedIn && user ? () => logout() : () => alert("You have not logged in")
               }
           ] 
        },
        {
            label: "Settings & others",
            items: [
                {
                    label: "Settings",
                    icon: "pi pi-cog",
                    command: () => history.push("/settings")
                },
                {
                    label: "About us",
                    icon: "pi pi-info"
                },
                {
                    label: "Contact us",
                    icon: "pi pi-envelope"
                },
                {
                    template: () => <div>please see</div>
                }
            ]
        }
        
    ];
    
    const ref = useRef<any>(null);

    const leftContent = (
        <Fragment>
            <form style={{width: "100%"}} className={"p-d-flex"} onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log(form);
            } }>
                <Button label={"Create"} appendTo={document.body} icon={"pi pi-video"} onClick={() => history.push("/create")} className={"p-d-none p-d-md-inline-flex p-mr-4"} />
                {location.pathname === "/games" ? (
                    <div className="p-inputgroup">
                    <InputText value={form} name={"find"} onChange={(e) => setForm(e.currentTarget.value)} placeholder={"Search for games"} />
                    <Button label="Search" icon={"pi pi-search"} className={"p-button-text"}/>
                </div>
                ) : (
                    <div className="p-inputgroup">
                    <InputText value={form} name={"find"} onChange={(e) => setForm(e.currentTarget.value)} placeholder={"Search for qlips"} />
                    <Button label="Search" icon={"pi pi-search"} className={"p-button-text"}/>
                </div>
                )}
                
            </form>

            <div>   
                <Menu model={moreMenuItems} popup ref={ref} id="popup_menu" appendTo={document.body} />
            <Button label="More" icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-d-none p-d-md-inline-flex" onClick={(event) => ref.current!.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        </Fragment>
    )

    

    return (<Fragment>
        <Toolbar className={"toolbar"} left={() => leftContent} />
    </Fragment>)
}

export default withRouter(observer(Toolbars));