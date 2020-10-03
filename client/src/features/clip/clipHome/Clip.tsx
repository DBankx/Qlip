import React, {useState} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import playButton from "../../../application/layout/images/play.png";
import {Link} from "react-router-dom";

interface IProps{
    clipData: IClip
}

const Clip: React.FC<IProps> = ({clipData}) => {
    
    const [duration, setDuration] = useState(0);
    
    return <div className={"clip-box p-mr-2 p-p-2 p-mb-2"}>
        <Link to={`/qlip/${clipData.id}`}>
        <div className={"video-thumbnail"}>
        <video src={clipData.url} onLoadedMetadata={e => setDuration(e.currentTarget.duration)}  className={"clip-thumbnail"} />
        <div className={"clip-duration"}>{duration.toFixed(2) + "S"}</div>
        <div className={"overlay"}>
            <div className={"content"}>
                <img className={"play-button"} alt={"play-button"} src={playButton} />
                </div>
        </div>
        </div>
        </Link>
        <div className={"clip-content"}>
        <Link to={`/qlip/${clipData.id}`}>{clipData.title}</Link>
        </div>
    </div>
}

export default Clip;