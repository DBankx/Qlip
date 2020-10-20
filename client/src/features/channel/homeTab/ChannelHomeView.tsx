import React from "react";
import {observer} from "mobx-react-lite";
import RecentClips from "./RecentClips";
import { IChannel } from "../../../infrastructure/models/channel";
import TopLikeGames from  "./TopLikedGames";

interface IProps{
    channel: IChannel
}

const ChannelHomeView: React.FC<IProps> = ({channel}) => {
    return (
        <div>
           <RecentClips channel={channel} />
           <hr className={"divider p-mt-3 p-mb-3"} />
           <TopLikeGames channel={channel}/>
        </div>
    )
}

export default observer(ChannelHomeView);