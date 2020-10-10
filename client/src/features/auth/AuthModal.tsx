import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import {Dialog} from "primereact/dialog";

const AuthModal = () => {
    const {modal:{open, body}, closeAuthModal} = useContext(rootStoreContext).commonStore;
    
    return (
        <div>
            <Dialog visible={open} className={"auth-modal"}  showHeader={false} modal={true} onHide={() => closeAuthModal()}>
                {body}
            </Dialog>
        </div>
    )
}

export default observer(AuthModal);