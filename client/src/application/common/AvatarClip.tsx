import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import user from "../layout/images/placeholder_user.png";
import rootStoreContext from "../../application/stores/rootStore";

const AvatarClip = () => {
    const {clip} = useContext(rootStoreContext).clipStore;
    return (
        <div className={"avatar-clip"}>
            <div className={"p-d-flex p-flex-wrap p-jc-between p-ai-center"}>
                <img style={{borderRadius: "50%", width: "45px", marginBottom: "3px"}} src={clip?.authorImage ? clip.authorImage : user } alt={"username-clip"} />
                <div>
                <span style={{fontSize: "0.9em"}}>{clip?.authorName}</span>
                    <span className={"followers-count"}>21.9k followers</span>
                </div>
            </div>
        </div>
    )    
}

export default observer(AvatarClip)