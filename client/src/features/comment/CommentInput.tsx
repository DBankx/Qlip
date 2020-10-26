import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import userPlaceholder from "../../application/layout/images/placeholder_user.png";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";

const CommentInput = () => {
    const {user, isLoggedIn} = useContext(rootStoreContext).authStore;
    return (
        <div className={"p-grid"} style={{width: "100%"}}>
            <div className={"p-col-2 p-md-1 p-sm-1 p-lg-1"}>
                <img src={user ? user.gravatarProfileImage : userPlaceholder} alt={"avatar"} style={{borderRadius: "50%", width: "45px"}}  />
            </div>
            <div className={"p-col-10 p-md-11 p-sm-11 p-lg-11"}>
            <InputTextarea disabled={!isLoggedIn} rows={4} tooltip={!isLoggedIn ? "Login to leave a comment" : "Leave a comment"} autoResize style={{width: "100%"}} placeholder={"Leave a comment"}/>
            <div style={{float: "right"}}>
                <Button label={"CANCEL"} className={"p-button-sm p-button-text p-button-plain"} />
                <Button label={"COMMENT"} className={"p-button-sm"} />
            </div>
            </div>
        </div>
    )
}

export default observer(CommentInput);