import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import {Dialog} from "primereact/dialog";
import logo from "../../application/layout/images/logo.png";

const AuthModal = () => {
    const {modal:{open, body}, closeAuthModal} = useContext(rootStoreContext).commonStore;
    
    return (
        <div>
            <Dialog visible={open} header={<img alt={"logo"} src={logo}  className="p-mr-2 main-logo"/>} className={"auth-modal"}  closable={true} modal={true} onHide={() => closeAuthModal()}>
                {body}
            </Dialog>
        </div>
    )
}

export default observer(AuthModal);