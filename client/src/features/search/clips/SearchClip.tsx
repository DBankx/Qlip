﻿import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import { Link } from "react-router-dom";
import playButton from "../../../application/layout/images/play.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import formatVideoTime from "../../../infrastructure/HelperFunctions/formatVideoTime";

dayjs.extend(relativeTime);

interface IProps{
    clip: IClip
}

const SearchClip : React.FC<IProps> = ({clip}) => {
    return (
        <Link to={`/qlip/${clip.id}`} style={{color: "#fff", textDecoration: "none"}}>
        <div className={"p-grid"}>
            <div className={"p-col-12 p-sm-4 p-md-4 p-lg-4"} >
                <div className={"search-thumbnail"}>
                    <img src={clip.thumbnail} alt="thumbnail" style={{width: "100%"}} />
                    <div className={"clip-duration"}>{formatVideoTime(clip.duration)}</div>
                    <div className={"search-content"}>
                        <img src={playButton} alt={"play"} />
                    </div>
                </div>     
            </div>
           
            <div className={"p-col-12 p-md-8 p-sm-8 p-lg-8"}>
                <p className={"truncate"} style={{fontWeight: 600}}>{clip.title}</p>
                <div style={{color: "#777777", marginTop: "0.4em"}}>
                    <small>{clip.views} Views</small>
                    <small style={{margin: "auto 0.3em"}}>•</small>
                    <small>{dayjs(clip.createdAt).fromNow()}</small>
                </div>
                <div className={"p-d-flex p-ai-center"} style={{marginTop: "0.4em"}}>
                    <img src={clip.authorImage} alt={"avatar"} style={{width: "30px", borderRadius: "50%"}} />
                    <p className={"p-ml-2"} style={{fontSize: "0.9em"}}>{clip.authorName}</p>
                </div>
                
                {clip.isWatched && (
                    <div className="watched-label" style={{marginTop: "1em"}}>
                        watched
                    </div>
                )}
            </div>
        </div>
        </Link>
    )
}

export default observer(SearchClip);