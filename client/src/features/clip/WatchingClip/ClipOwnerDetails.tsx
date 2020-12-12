import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import AvatarClip from "../../../application/common/AvatarClip";
import {Button} from "primereact/button";
import { IClip } from "../../../infrastructure/models/clip";
import rootStoreContext from "../../../application/stores/rootStore";
import {history} from "../../../index"; 

interface IProps{
    clip: IClip
}

const ClipOwnerDetails : React.FC<IProps> = ({clip}) => {
    const {subscribing, SubscribeToUser, UnSubscribeToUser} = useContext(rootStoreContext).subscriptionStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    const subscribedStyle = {
    color: "#777777",
    borderColor: "#777777",
    background: "none",
    fontWeight: 600    
    }
    
    return (
        <div className={"p-d-flex p-jc-between p-ai-center"}>
            <AvatarClip />
            {!isLoggedIn ? <Button label={"Subscribe"} icon={"pi pi-plus"} tooltip={"Login to subscribe"} tooltipOptions={{position: "bottom"}} /> : clip.isUser ? (<Button label={"Edit"} style={{fontWeight: 600}} icon={"pi pi-pencil"} onClick={() => history.push(`/manage/${clip.id}`)} />) : (<Button label={clip.subscribedToAuthor ? "Subscribed" : "Subscribe" } className={"p-button-sm"} onClick={clip.subscribedToAuthor ? () => UnSubscribeToUser(clip.authorName) : () => SubscribeToUser(clip.authorName) } icon={subscribing ? "pi pi-spin pi-spinner" :clip.subscribedToAuthor ? "pi pi-check" : "pi pi-plus"} style={clip.subscribedToAuthor ? subscribedStyle : {fontWeight: 600}} />)} 
        </div>
    )
}



export default observer(ClipOwnerDetails);