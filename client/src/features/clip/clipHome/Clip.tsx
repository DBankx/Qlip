import React, {useState} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import playButton from "../../../application/layout/images/play.png";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IProps{
    clipData: IClip
}

const Clip: React.FC<IProps> = ({clipData}) => {
    
    const [duration, setDuration] = useState(0);
    
    return <div >
        <Link to={`/qlip/${clipData.id}`}>
        <div className={"video-thumbnail"}>
        <img src={clipData.thumbnail} alt="thumbnail" className={"clip-thumbnail"} />
        <div className={"clip-duration"}>{duration.toFixed(2) + "S"}</div>
        <div className={"overlay"}>
            <div className={"content"}>
                <img className={"play-button"} alt={"play-button"} src={playButton} />
                </div>
        </div>
        </div>
        </Link>
        <div className={"clip-content p-grid"}>
            <div className={"p-col-2"}>
                <img className={"clip-author-image"} src={clipData.authorImage} alt={"author-avatar"} />
            </div>
            <div className={"p-col-10"}>
                <Link to={`/qlip/${clipData.id}`} className={"upNext-title"} style={{fontSize: "0.9em", fontWeight: 500}}>{clipData.title}</Link>
                <Link to={"/"} style={{color: "#777777", display: "block", fontSize: "0.85em"}}>{clipData.authorName}</Link>
                <div className={"p-d-flex"} style={{color: "#777777", fontSize: "0.8em"}}>
                    <span>{clipData.views} Views</span>
                    <span style={{margin: "0 0.4em"}}>•</span>
                    <span>{dayjs(clipData.createdAt).fromNow()}</span>
                </div>
                {clipData.isWatched && (
                    <div className="watched-label">
                        watched
                    </div>
                )}
            </div>
        
        </div>
    </div>
}

export default Clip;