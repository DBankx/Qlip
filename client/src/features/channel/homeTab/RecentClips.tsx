import React from "react";
import {observer} from "mobx-react-lite";
import { IClip } from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import ChannelClip from "../ChannelClip";

interface IProps{
    channelClips: IClip[]
}

const RecentClips: React.FC<IProps> = ({channelClips}) => {
    return (
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "0.9em"}}>Recent uploads</span>
            <Button label={"Play all recent"} icon={"pi pi-play"} className={"p-button-text p-button-plain p-ml-3"} />
            </div>
            <div style={{marginTop: "1em"}}>
            {channelClips.slice(0, 5).map((clip: IClip) => (
                <ChannelClip clip={clip} />
            ))}
            </div>
        </div>
    )
}

export default observer(RecentClips);