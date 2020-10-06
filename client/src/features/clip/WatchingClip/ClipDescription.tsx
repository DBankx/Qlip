import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";

interface IProps{
    clip: IClip
}

const ClipDescription: React.FC<IProps> = ({clip}) => {
    const Description = () => {
        return (<div>
        <span className={"clip-description"}>
            `${clip.description.substring(0, 200)}...` 
        </span>
           <Button label={"SHOW MORE"} icon={"pi pi-info"} className={"p-button-plain"}/> 
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