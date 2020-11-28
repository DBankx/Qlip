import React from "react";
import {IClip} from "../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import playButton from "../../application/layout/images/play.png";
import dayjs from "dayjs";
import {Link} from "react-router-dom";


interface IProps{
    clip: IClip
}

const HistoryClip : React.FC<IProps> = ({clip}) => {
    return (
        <div style={{marginTop: "1em"}}>
            <Link to={`/qlip/${clip.id}`} style={{color: "#fff", textDecoration: "none"}}>
                <div className="p-grid">
                    <div className="p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6" style={{padding: 0}}>
                        <div className="upNext-thumbnail">
                            <img alt="author" src={clip.thumbnail} style={{width: "100%"}} />
                            <div className={"upNext-content"}>
                                <img src={playButton} alt={"play"} />
                            </div>
                        </div>
                    </div>

                    <div className="p-col-12 p-md-7 p-xl-7 p-lg-8">
                        <p style={{fontSize: "0.9em"}} className="upNext-title">{clip.title}</p>
                        <div style={{color: "#777777", fontWeight: 600, marginTop: "0.5em"}}>
                            <small >{clip.authorName}</small>
                        </div>
                        <div style={{color: "#777777", margin: "0.5em 0"}}>
                            <small>{clip.views} Views</small>
                            <small style={{margin: "0 0.2em"}}>•</small>
                            <small>{dayjs(clip.createdAt).fromNow()}</small>
                        </div>
                        <small style={{fontWeight: 600, color: "#777777"}}><span><i style={{fontSize: "0.9em"}} className="pi pi-clock" /></span> Watched {new Date(clip.watchedAt).toUTCString()}</small>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default observer(HistoryClip);