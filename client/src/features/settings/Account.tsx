import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";
import Register from "../auth/Register";
import Login from "../auth/Login";
import accountimg from "../../application/layout/images/undraw_profile_pic_ic5t.svg";

const Account  = () => {
    const {user, isLoggedIn} = useContext(rootStoreContext).authStore;
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    
    return (
        <div className={"p-grid p-jc-between p-ai-center p-mt-4"}>
            <div>
                <p style={{fontSize: "1.3em"}}>Choose how you appear on Qlip</p>
                {isLoggedIn && user ? <p className={"p-mt-3"} style={{color: "#777777"}}>Signed in as {user.email}</p> : <div>
                    <p className={"p-mt-3 p-mb-3"} style={{color: "#777777"}}>You are not logged in</p>
                    <div className={"p-d-flex p-ai-center"}>
                        <Button label={"Register"} onClick={() => openAuthModal(<Register />, "Join qlip")}  /> 
                        <p className={"p-ml-3 p-mr-3"}>or</p>
                        <Button label={"login"} onClick={() => openAuthModal(<Login />, "Sign in to qlip")} className={"p-button-outlined"}/>    
                    </div>
                </div>}
            </div>
            <div className={"hide-sm"}>
                <img alt={"account"} src={accountimg} style={{width: "150px"}}/>
            </div>
        </div>
    )
}

export default observer(Account);