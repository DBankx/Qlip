import React from "react";
import {observer} from "mobx-react-lite";
import user from "../layout/images/placeholder_user.png";

const AvatarClip = () => {
    return (
        <div className={"avatar-clip"}>
            <div className={"p-d-flex p-flex-wrap p-jc-between p-ai-center"}>
                <img src={user} alt={"username-clip"} />
                <p>AlexGaming</p>
            </div>
        </div>
    )    
}

export default observer(AvatarClip)