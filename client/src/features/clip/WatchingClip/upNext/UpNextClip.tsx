import React from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../../infrastructure/models/clip";
import playButton from "../../../../application/layout/images/play.png";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface IProps{
    clip: IClip
}

dayjs.extend(relativeTime);

const UpNextClip: React.FC<IProps> = ({clip}) => {
    return (
        <Link to={`/qlip/${clip.id}`} style={{color: "#fff", textDecoration: "none"}}>
        <div className="p-grid">
            <div className="p-col-6" style={{padding: 0}}>
                <div className="upNext-thumbnail">
                    <video src={clip.url} style={{width: "100%"}} />
                    <div className={"upNext-content"}>
                        <img src={playButton} alt={"play"} />
                    </div>
                </div>
            </div>
            
            <div className="p-col-6">
                <p style={{fontSize: "0.9em"}} className="upNext-title">{clip.title}</p>
                <small style={{color: "#777777", marginTop: "3px", fontWeight: 600}}>{clip.authorName}</small>
                <div style={{color: "#777777"}}>
                <small>{clip.views} Views</small>
                <small style={{margin: "0 0.2em"}}>•</small>
                <small>{dayjs(clip.createdAt).fromNow()}</small>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default observer(UpNextClip)