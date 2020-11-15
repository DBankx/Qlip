import React, {useContext} from "react";
import authLogo from "../../application/layout/images/undraw_authentication_fsn5.svg";
import {Button} from "primereact/button";
import {useMediaQuery} from "react-responsive";
import rootStoreContext from "../../application/stores/rootStore";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";

const UnAuthorized = () => {
    const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            <div className={"spinner"}>
                <img src={authLogo} alt={"auth"} style={isMobile ? {width: "300px"} : {width: "400px"}} />
                <div style={{textAlign: "center"}}>
                    <h3>You are not allowed to view this content</h3>
                    <div style={{margin: "1em auto"}}>
                        <Button onClick={() => openAuthModal(<Login />, "")} label={"Login"} className={"p-button-outlined"} style={{width: "100%", fontWeight: 600}} />
                        <h5 style={{margin: "0.5em 0"}}>OR</h5>
                        <Button label={"Register"} onClick={() => openAuthModal(<Register />, "")} style={{width: "100%", fontWeight: 600}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnAuthorized;