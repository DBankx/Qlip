import React from "react";
import {IChannel, IChannelUser} from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

interface IProps{
    channelUser: IChannelUser,
    channel: IChannel
}

const ChannelUser : React.FC<IProps> = ({channelUser, channel}) => {
    const subscribedStyle = {
        color: "#777777",
        borderColor: "#777777",
        background: "none",
        fontWeight: 600
    }
    return (
        <Link to={`channel/${channelUser.username}`} style={{color: "#fff", textDecoration: "none"}}>
            <div style={{textAlign: "center"}}>
            <img src={channelUser.gravatarProfileImage} alt={"channel-image"} style={{width: "100px", borderRadius: "50%", textAlign: "center"}} />
            </div> 
            <div style={{textAlign: "center"}}>
                <span style={{display: "block"}}>{channelUser.username}</span>
                <span style={{color: "#777777", fontSize: "0.8em"}}>{channelUser.subscriberCount} {channelUser.subscriberCount > 1 ? "Subscribers" : "Subscriber"}</span>
                <Button label={channel.isUser ? "Subscribed" : "Subscribe"} icon={channel.isUser ? "pi pi-check" : "pi pi-plus"} className={"p-button-sm p-mt-2"} style={channel.isUser ? subscribedStyle : {}} />
            </div>
        </Link>
    )
}

export default observer(ChannelUser);