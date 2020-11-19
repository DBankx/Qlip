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
import {Formik} from "formik";
import * as yup from "yup";
import {Dropdown} from "primereact/dropdown";
import {useMediaQuery} from "react-responsive";

const Toolbars: React.FC<RouteComponentProps> = ({location}) => {
    const {isLoggedIn, user, logout} = useContext(rootStoreContext).authStore;
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    // placeholder form state managment
    const [form, setForm] = useState("");
    const clipSearchValidationSchema = yup.object().shape({
        title: yup.string().required()
    })
   
    const selectItems = [
        {label: "qlips", value: "QP"},
        {label: "channels", value: "CH"},
        {label: "games", value: "GE"}
    ]

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
                    icon: "pi pi-info",
                    command: () => history.push("/about")
                },
                {
                    label: "Contact us",
                    icon: "pi pi-envelope",
                    command: () => history.push("/contact")
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
                <Button label={"Upload"} onClick={() => history.push("/create")} style={{fontWeight: 600}} className={"p-d-none p-d-md-inline-flex p-mr-4 p-button-bg"} />
                
                        <Formik validationSchema={clipSearchValidationSchema} initialValues={{title: "", predicate: "qlips"}} onSubmit={(values, action) => {
                          history.push(`/search/${values.predicate}?${values.predicate === "channels" ? "username" : "title"}=${values.title}`);
                          action.setSubmitting(false);
                        }}>
                            {({handleSubmit, values, errors, touched, dirty, handleChange, handleBlur, isSubmitting, isValid }) => (
                                <form onSubmit={handleSubmit} style={{width: "100%"}} className={"p-d-flex"}>
                                    <Dropdown style={isMobile ? {width: "20%"} :{width: "10%"}} options={selectItems} value={values.predicate} onChange={handleChange} appendTo={document.body}  name={"predicate"} optionLabel={"label"} optionValue={"label"} />
                                    <div className="p-inputgroup" style={{marginLeft: "0.5em"}}>
                                <InputText  value={values.title} name={"title"} onChange={handleChange} onBlur={handleBlur} placeholder={"Search"} className={`${errors.title && touched.title && "p-invalid"} p-d-block`} />
                                <Button label={isMobile ? "" : "Search"} disabled={!isValid || isSubmitting || !dirty} icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-search"} type={"submit"} className={"p-button-text"}/>
                                    </div>
                                </form>
                                )}
                       </Formik>
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