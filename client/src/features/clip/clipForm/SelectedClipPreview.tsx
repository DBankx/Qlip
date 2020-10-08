import React, {useContext, Fragment} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import {Card} from "primereact/card";

const SelectedClipPreview = () => {
    const {selectedClip, uploadedClip} = useContext(rootStoreContext).clipStore;
    
    return(
        <Fragment>
        {selectedClip && (
            <Card header={<video controls src={selectedClip} style={{width: "100%"}} />}>
                <div className="p-m-0">
                    <div className={"video-details"}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Upload link </span>
                        <span style={{display: "block"}}>{uploadedClip ? <a href={uploadedClip.url} target={"_blank"} rel={"noopener"}>{uploadedClip.url}</a> : <p style={{color: "#D9381E"}}>*Qlip has not been uploaded yet</p>}</span>
                    </div>
                    <div className={"video-details"}>
                        <span style={{fontSize: "0.8em", color: "#D4DBDB"}}>Filename </span>
                        <span style={{display: "block"}}>{uploadedClip ? <a href={uploadedClip.url} target={"_blank"} rel={"noopener"}>{uploadedClip.url}</a> : <p style={{color: "#D9381E"}}>*Qlip has not been uploaded yet</p>}</span>
                    </div>
                </div>
            </Card>
        )}
        </Fragment>
        
    )
}

export default observer(SelectedClipPreview);