import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";
import Register from "../auth/Register";
import Login from "../auth/Login";

const EmptySettings = () => {
    const {openAuthModal} = useContext(rootStoreContext).commonStore;
    return (
        <div className={"spinner"} style={{textAlign: "center"}}>
            <i className={"far fa-window-close fa-6x"} style={{color: "#777777"}} />
            <p style={{marginTop: "1em"}}>You are not logged in</p>
            <div className={"p-d-flex p-ai-center"} style={{marginTop: "1em"}}>
                <Button label={"Register"} onClick={() => openAuthModal(<Register />, "Signup")} />
                <p className={"p-ml-3 p-mr-3"} style={{color: "#777777"}}>OR</p>
                <Button label={"Login"} className={"p-button-outlined"} onClick={() => openAuthModal(<Login />, "Login")} />
            </div>
        </div>
    )
}

export default observer(EmptySettings);