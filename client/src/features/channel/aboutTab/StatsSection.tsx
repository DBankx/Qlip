import React, { Fragment } from "react";
import {IChannel} from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import dayjs from "dayjs";

interface IProps{
    channel: IChannel
}

const StatsSection : React.FC<IProps> = ({channel}) => {
    return (
        <Fragment>
           <span>Stats</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <span style={{fontSize: "0.9em"}}>Joined {dayjs(channel.createdAt).format("DD MMM YYYY")}</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <span style={{fontSize: "0.9em"}}>uploaded {channel.clips.length} Qlip(s)</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <span style={{fontSize: "0.9em"}}>{channel.overallViews} Views</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <span style={{fontSize: "0.9em"}}>Liked {channel.likedGames.length} Games </span>
        </Fragment>
    )
}

export default observer(StatsSection);