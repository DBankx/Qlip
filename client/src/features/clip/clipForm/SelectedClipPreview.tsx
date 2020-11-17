import React, {useContext, Fragment} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import {Card} from "primereact/card";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import {Button} from "primereact/button";

dayjs.extend(calendar);

const SelectedClipPreview = () => {
   const {uploadedClip, deleteUploadedClip, deletingClip} = useContext(rootStoreContext).clipStore; 
    return(
        <Fragment>
        {uploadedClip.url && (
            <Card header={<video controls src={uploadedClip.url} style={{width: "100%"}} />}>
                <div className="p-m-0">
                    <div className={"video-details"}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Upload link </span>
                        <span style={{display: "block", width:"100%"}}>{<a style={{color: "#2196F3", textDecoration: "none"}} className={"truncate"} href={uploadedClip.url} target={"_blank"} rel={"noopener noreferrer"}>{uploadedClip.url}</a>}</span>
                    </div>
                    
                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Filename </span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{uploadedClip.original_filename}</span>
                    </div>

                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Video format </span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{uploadedClip.format}</span>
                    </div>
                    
                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Duration</span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{uploadedClip.duration}</span>
                    </div>

                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Uploaded at</span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{dayjs().calendar(dayjs(uploadedClip.created_at!))}</span>
                    </div>

                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Frame rate</span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{uploadedClip.frame_rate}</span>
                    </div>
                </div>
                
                <Button label="Delete" disabled={deletingClip}  icon={deletingClip ? "pi pi-spin pi-spinner" : ""} onClick={() => deleteUploadedClip()} className="p-button-danger p-shadow-11" style={{width: "100%", marginTop: "1em", fontWeight: 600}} />
            </Card>
        )}
        </Fragment>
        
    )
}

export default observer(SelectedClipPreview);