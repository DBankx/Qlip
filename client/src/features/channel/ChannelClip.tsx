import React, {useState} from "react";
import { IClip } from "../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import playButton from "../../application/layout/images/play.png";
import {Link} from "react-router-dom";
import dayjs from "dayjs";

interface IProps{
    clip: IClip
}

const ChannelClip: React.FC<IProps> = ({clip}) => {
    const [duration, setDuration] = useState(0);
    return (
        <div className={"p-mb-5"}>
            <Link to={`/qlip/${clip.id}`}>
                <div className={"channel-thumbnail p-mr-3"}>
                    <video src={clip.url} onLoadedMetadata={e => setDuration(e.currentTarget.duration)}  className={"clip-channel-thumbnail"} />
                    <div className={"clip-duration"}>{duration.toFixed(2) + "S"}</div>
                    <div className={"channel-overlay"}>
                        <div className={"content"}>
                            <img className={"play-button-channel"} alt={"play-button"} src={playButton} />
                        </div>
                    </div>
                </div>
            </Link>
            <Link to={`/qlip/${clip.id}`} className={"tw-ellipsis"} style={{fontSize: "0.9em", fontWeight: 500, textDecoration: "none", color: "#fff"}}>{clip.title}</Link>
            <div className={"p-d-flex clip-content"} style={{color: "#777777", fontSize: "0.8em"}}>
                <span>{clip.views} Views</span>
                <span style={{margin: "0 0.4em"}}>•</span>
                <span>uploaded {dayjs(clip.createdAt).fromNow()}</span>
            </div>
        </div>
    )
}

export default observer(ChannelClip);