import React from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import {Card} from "primereact/card";
import parse from "html-react-parser";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

interface IProps{
    clip: IClip,
    values: any
}

const ManagedClip : React.FC<IProps> = ({clip, values}) => {
    return (
        <div>
            <Card header={<video src={clip.url} controls style={{width: "100%"}} />}>
                <small style={{color: "#777777"}}>Title</small>
                <p>{values.title.length > 0 ? values.title : <span style={{color: "#D9381E"}}>No title</span>}</p>
                
                <div style={{marginTop: "1em"}}>
                    <small style={{color: "#777777", display: "block"}}>Description</small>
                    {parse(values.description)}
                </div>
                <div style={{marginTop: "1em"}}>
                    <small style={{color: "#777777"}}>Qlip url</small>
                    <p><a target={"_blank"} style={{textDecoration: "none", color: "#0e6cff"}} href={clip.url} rel={"noopener noreferrer"} className={"truncate"}>{clip.url}</a></p>
                </div>
                <div style={{marginTop: "1em"}}>
                   <div className={"p-d-flex"}>
                       <p className={"p-mr-5"}>{clip.likes} likes</p>
                       <p>{clip.dislikes} dislikes</p>
                   </div> 
                </div>
            </Card>
        </div>
    )
} 

export default observer(ManagedClip);