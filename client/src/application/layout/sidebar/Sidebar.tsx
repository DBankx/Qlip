﻿import React, {useContext} from "react";
import {Menu} from "primereact/menu";
import {history} from "../../../index";
import rootStoreContext from "../../stores/rootStore";

const Sidebar = () => {
    const {user} = useContext(rootStoreContext).authStore;
    
    const sidebarNavigationModel =  [
        {
            label: 'Home',
            icon: "pi pi-home",
            command: () => history.push("/")

        },
        {
            label: 'Popular games',
            icon: "pi pi-star-o",
            command: () => history.push("/popular-games")

        },
        {
            label: "Subscriptions",
            icon: "pi pi-user-plus",
            command: () => history.push(`/channel/${user && user.username}?tab=subscriptions`)
        },
        {
            separator: true
        },
        {
            label: "Your History",
            icon: "fas fa-history",
            command: () => history.push("/history")
        },
        {
            label: "Liked Qlips",
            icon: "fas fa-thumbs-up",
            command: () => history.push(`/channel/${user && user.username}?tab=liked`)
        },
        {
            label: "Your Qlips",
            icon: "fas fa-video",
            command: () => history.push(`/channel/${user && user.username}?tab`)
        },
        {
            separator: true
        },
        {
          label: "About us",
          icon: "pi pi-info",
          command: () => history.push("/about")  
        },
        {
            label: "Send Feedback",
            icon: "pi pi-comment",
            command: () => history.push("/send-feedback")
        },
        {
            label: "Report history",
            icon: "fas fa-flag",
            command: () => history.push("/history-report")
        },
        {
            separator: true
        },
        {
            label: "2020-2021 copyright Qlip",
            className: "copyright",
            icon: "far fa-copyright"
        }
        

    ];
    return (
            <Menu appendTo={document.body} style={{position: "fixed"}}  className={"main-sidebar p-d-none p-d-md-none  p-d-xl-inline-flex"} model={sidebarNavigationModel} />
    )
}

export default Sidebar;