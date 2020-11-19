import React from "react";
import { IChannel } from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {useMediaQuery} from "react-responsive";
import ChannelClip from "../../../features/channel/ChannelClip";
import { IClip } from "../../../infrastructure/models/clip";

interface IProps{
    channel: IChannel
}

const LikedClipsTab : React.FC<IProps> = ({channel}) => {
    const isMobile = useMediaQuery({query: "(max-width: 400px)"})
    return (
        <div>
            <span style={{fontSize: "0.9em"}}>Liked by {channel.username}</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <div className={isMobile ? "grid p-ai-center p-jc-center": "grid p-ai-center"}>
                {channel.likedClips.length > 0 ? channel.likedClips.map((clip: IClip) => (
                    <div key={clip.id} className={"p-col-12 p-lg-3 p-md-5 p-sm-6"}>
                        <ChannelClip clip={clip} />
                    </div>
                )) : <span>{channel.isUser ? "you" : channel.username} {channel.isUser ? "have" : "has"} no liked Qlips</span>}
            </div>
        </div>
    )
}

export default observer(LikedClipsTab);