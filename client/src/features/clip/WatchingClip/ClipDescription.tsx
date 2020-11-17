import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import parse from "html-react-parser";

interface IProps{
    clip: IClip
}

const ClipDescription: React.FC<IProps> = ({clip}) => {
    
    return (
        <div style={{marginTop: "1em"}}>
            <span style={{fontSize: "0.7em", display: "block", color: "#4A4A4A", fontWeight: 600, margin: "0.5em 0"}}>Description</span>
            <span className={"clip-description"}>{parse(clip.description ? clip.description : "")}</span>
        </div>
    )
}

export default ClipDescription;