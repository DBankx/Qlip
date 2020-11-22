import React from "react";
import { IChannel } from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {useMediaQuery} from "react-responsive";
import ChannelClip from "../../../features/channel/ChannelClip";
import { IClip } from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";

interface IProps{
    channel: IChannel
}

const LikedClipsTab : React.FC<IProps> = ({channel}) => {
    const isMobile = useMediaQuery({query: "(max-width: 400px)"})
    return (
        <div>
            <span style={{fontSize: "0.9em"}}>Liked by {channel.username}</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <div className={isMobile ? "grid p-ai-center p-jc-center": "p-grid"}>
                {channel.likedClips.length > 0 ? channel.likedClips.map((clip: IClip) => (
                    <div key={clip.id} className={"p-col-12 p-lg-3 p-md-5 p-sm-6"}>
                        <ChannelClip clip={clip} />
                    </div>
                )) : <div className="p-text-center" style={{margin: "4em auto", fontWeight: 600, color: "#777777"}}>
                    <div>
                        <p>{channel.isUser ? "you" : channel.username} {channel.isUser ? "have" : "has"} no liked Qlips</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default observer(LikedClipsTab);