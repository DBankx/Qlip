import React, {useContext, Fragment} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import {Card} from "primereact/card";
import {ProgressBar} from "primereact/progressbar";

const SelectedClipPreview = () => {
    const {selectedClip, uploadedClip, selectedClipBlob, progress, uploadingClip} = useContext(rootStoreContext).clipStore;
    
    return(
        <Fragment>
        {selectedClip && (
            <Card header={<video controls src={selectedClip} style={{width: "100%"}} />}>
                {progress > 0 && (
                    <div style={{marginBottom: "1em"}}>
                        <ProgressBar value={progress} />
                    </div>)}
                
                <div className="p-m-0">
                    <div className={"video-details"}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Upload link </span>
                        <span style={{display: "block", width:"100%"}}>{uploadedClip ? <a style={{color: "#2196F3", textDecoration: "none"}} href={uploadedClip.url} target={"_blank"} rel={"noopener noreferrer"}>{`${uploadedClip.url.substring(0, 45)}...`}</a> :uploadingClip ? <p style={{color: "#81C784", fontSize: "0.9em"}}>uploading...</p> :   <p style={{color: "#D9381E", fontSize: "0.9em"}}>*Qlip has not been uploaded yet</p>}</span>
                    </div>
                    
                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Filename</span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{selectedClipBlob && selectedClipBlob.name}</span>
                    </div>
                    <div className={"video-details"} style={{marginTop: "1em"}}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Last modified time</span>
                        <span style={{display: "block", fontSize: "0.9em"}}>{selectedClipBlob && selectedClipBlob.lastModifiedDate.toLocaleTimeString()}</span>
                    </div>
                </div>
            </Card>
        )}
        </Fragment>
        
    )
}

export default observer(SelectedClipPreview);