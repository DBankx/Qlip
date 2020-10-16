import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";

interface IProps{
    clip: IClip
}

const ClipTitle: React.FC<IProps> = ({clip}) => {
    return (
        <div style={{marginTop: "0.5em"}}>
            <span className={"game-tag"}>#{clip.gameName ? clip.gameName : "fortnite"}</span>
            <h4>{clip.title}</h4>
        </div>
    )
}

export default observer(ClipTitle);