import React, {useContext} from "react";
import {IChannel, IChannelUser} from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import rootStoreContext from "../../../application/stores/rootStore";

interface IProps{
    channelUser: IChannelUser,
    channel: IChannel
}

const ChannelUser : React.FC<IProps> = ({channelUser, channel}) => {
    const {subscribingToChannel, subscribingTarget, subscriptionToChannelFollow} = useContext(rootStoreContext).subscriptionStore;
    const subscribedStyle = {
        color: "#777777",
        borderColor: "#777777",
        background: "none",
        fontWeight: 600
    }
    return (
        <div style={{textAlign: "center"}}>
        <Link to={`/channel/${channelUser.username}`} style={{color: "#fff", textDecoration: "none"}}>
            <div style={{textAlign: "center"}}>
            <img src={channelUser.gravatarProfileImage} alt={"channel-avatar"} style={{width: "100px", borderRadius: "50%", textAlign: "center"}} />
            </div> 
            <div style={{textAlign: "center"}}>
                <span style={{display: "block"}}>{channelUser.username}</span>
                <span style={{color: "#777777", fontSize: "0.8em"}}>{channelUser.subscriberCount} {channelUser.subscriberCount > 1 ? "Subscribers" : "Subscriber"}</span>
            </div>
            </Link>
                <Button label={channel.isUser || channelUser.subscribedToChannel ? "Subscribed" : "Subscribe"} icon={subscribingTarget === channelUser.username && subscribingToChannel ? "pi pi-spin pi-spinner" : channel.isUser || channelUser.subscribedToChannel ? "pi pi-check" : "pi pi-plus"} className={"p-button-sm p-mt-2"} style={channel.isUser || channelUser.subscribedToChannel ? subscribedStyle : {}} onClick={channelUser.subscribedToChannel ? () => subscriptionToChannelFollow(channelUser.username, "unsubscribing") : () => subscriptionToChannelFollow(channelUser.username, "subscribing")} />
        </div>
    )
}

export default observer(ChannelUser);