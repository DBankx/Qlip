import React from "react";
import {observer} from "mobx-react-lite";
import RecentClips from "./RecentClips";
import { IChannel } from "../../../infrastructure/models/channel";

interface IProps{
    channel: IChannel
}

const ChannelHomeView: React.FC<IProps> = ({channel}) => {
    return (
        <div>
           <RecentClips channelClips={channel.clips} /> 
        </div>
    )
}

export default observer(ChannelHomeView);