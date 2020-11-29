import React, {useContext} from "react";
import rootStoreContext from "../stores/rootStore";

const AlertRegister = () => {
    const {removeAlertRegister} = useContext(rootStoreContext).commonStore;
    return (
        <div className="alert-reg p-d-flex p-ai-center p-jc-between">
            <div className="p-d-flex p-ai-center">
            <i className="pi pi-info" />
            <p style={{marginLeft: "2em"}}>Please log in or register to access all features!!</p>
            </div>
            <i className="pi pi-times p-ml-2" onClick={() => removeAlertRegister() } />
        </div>
    )
}

export default AlertRegister;