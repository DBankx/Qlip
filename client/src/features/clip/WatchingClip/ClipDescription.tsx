import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import parse from "html-react-parser";

interface IProps{
    clip: IClip
}

const ClipDescription: React.FC<IProps> = ({clip}) => {
    const Description = () => {
        return (<div>
        <span className={"clip-description"}>
            {parse(clip.description)}
        </span>
        </div>)
    }
    
    return (
        <div style={{marginTop: "1em"}}>
            <span style={{fontSize: "0.7em", display: "block", color: "#4A4A4A", fontWeight: 600}}>Description</span>
            <span className={"clip-description"}>{clip.description.length > 200 ? <Description /> : clip.description}</span>
        </div>
    )
}

export default ClipDescription;