import React from "react";
import { IClip } from "../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";

interface IProps{
    clip: IClip
}

const ChannelClip: React.FC<IProps> = ({clip}) => {
    return (
        <div>
            {clip.title}
        </div>
    )
}

export default observer(ChannelClip);