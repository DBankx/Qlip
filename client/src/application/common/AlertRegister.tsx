import React, {useContext} from "react";
import rootStoreContext from "../stores/rootStore";

interface IProps {
    message: string;
    icon: string;
    status: string;
}
const AlertRegister : React.FC<IProps> = ({message, icon, status}) => {
    const {removeAlertRegister, sidebarVisible} = useContext(rootStoreContext).commonStore;
    return (
        <div style={!sidebarVisible ? {width: "100vw", left: "0"} : {}} className={`${status} p-d-flex p-ai-center p-jc-between`}>
            <div className="p-d-flex p-ai-center">
            <i className={icon} />
            <p style={{marginLeft: "2em"}}>{message}</p>
            </div>
            <i className="pi pi-times p-ml-2" onClick={() => removeAlertRegister() } />
        </div>
    )
}

export default AlertRegister;