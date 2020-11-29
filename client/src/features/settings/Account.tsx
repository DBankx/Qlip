import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import accountimg from "../../application/layout/images/undraw_profile_pic_ic5t.svg";

const Account  = () => {
    const {user} = useContext(rootStoreContext).authStore;
    
    return (
        <div className={"p-grid p-jc-between p-ai-center p-mt-4"}>
            <div>
                <p style={{fontSize: "1.3em"}}>Choose how you appear on Qlip</p>
               <p className={"p-mt-3"} style={{color: "#777777"}}>Signed in as {user!.email}</p>            </div>
            <div className={"hide-sm"}>
                <img alt={"account"} src={accountimg} style={{width: "150px"}}/>
            </div>
        </div>
    )
}

export default observer(Account);