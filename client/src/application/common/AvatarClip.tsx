import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import user from "../layout/images/placeholder_user.png";
import rootStoreContext from "../../application/stores/rootStore";
import {Link} from "react-router-dom";

const AvatarClip = () => {
    const {clip} = useContext(rootStoreContext).clipStore;
    return (
        <Link to={`/channel/${clip?.authorName}`} style={{textDecoration: "none", color: "#fff"}}>
        <div className={"avatar-clip"}>
            <div className={"p-d-flex p-flex-wrap p-ai-center"}>
                <img style={{borderRadius: "50%", width: "45px", marginBottom: "3px"}} src={clip?.authorImage ? clip.authorImage : user } alt={"username-clip"} />
                <div>
                    <div className={"p-ml-2"}>
                <span style={{fontSize: "0.9em"}}>{clip?.authorName}</span>
                    <span className={"followers-count"}>{clip?.authorSubscriberCount} {clip!.authorSubscriberCount > 1 ? "Subscribers" : "Subscriber"}</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )    
}

export default observer(AvatarClip)