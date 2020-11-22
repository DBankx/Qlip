import React, {useContext, useEffect} from "react";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";
import Login from "../../features/auth/Login";
import {history} from "../../index";

const UnAuthorized = () => {
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    useEffect(() => {
        if(isLoggedIn){
            history.goBack();
        }
    }, [isLoggedIn])
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            <div className={"spinner"} style={{textAlign: "center"}}>
               <h1 style={{color: "#777777"}}>401</h1> 
                <p style={{color: "#777777", fontWeight: 600}}>Unauthorized</p>
                <Button label="Login" className="p-button-sm p-button-outlined" onClick={() => openAuthModal(<Login />)} style={{width: "100%", marginTop: "1em"}} />
            </div>
        </div>
    )
}

export default UnAuthorized;