import React, {Fragment, useContext, useRef} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import {observer} from "mobx-react-lite";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import {Menu} from "primereact/menu";
import rootStoreContext from "../../../application/stores/rootStore";
import {history} from "../../../index";
import Clipboard from "clipboard";
import {useMediaQuery} from "react-responsive";

interface IProps{
    clip: IClip
}

// dayjs config
dayjs.extend(relativeTime);

const ClipAction: React.FC<IProps> = ({clip}) => {
    
    const {deleteClip, deletingClip, likeClip, dislikeClip} = useContext(rootStoreContext).clipStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    const {showAlert} = useContext(rootStoreContext).commonStore;
    const isMobile = useMediaQuery({query: "(max-width: 400px)"});
    
    // copy the link of the clip to the keyboard
    let url = document.location.href;
    
    new Clipboard(".share-btn", {
        text: function (){
            return url;
        }
    })
    
    const optionsRef = useRef<any>(null);
    
    const optionsModel = [
                {
                    label: 'Report',
                    icon: 'far fa-flag',
                    command: () => history.push(`/report/${clip.authorName}`)
                },
                {
                    label: 'Delete',
                    icon: deletingClip ? "pi pi-spin pi-spinner" : "pi pi-times",
                    command: () => deleteClip(clip.id).then(() => history.push("/"))
                },
                {
                    label: 'SHARE',
                    icon: "fas fa-share",
                    className: "share-btn hide-bg",
                    command: () => showAlert("info", "Copied", "Url copied to clipboard!")
                }
                
                ];
    
    
    return (
        <Fragment>
            <div className={"p-grid p-ai-center p-justify-between small-lines"}>
                {/*clip details*/}
                <div className={"p-col-3 p-md-6 p-lg-5 p-xl-5 p-sm-2"}>
                    <div style={{float: "left"}}>
                          <span className={"clip-detail-line"} >
                              {clip.views} Views 
                            </span>
                    <span className={"clip-detail-line hide-sm"}>
                        {" "}• {dayjs(clip.createdAt).fromNow()}
                    </span>
                    </div>
                </div>

                {/*clip trigger buttons*/}
                <div className={"p-col-9 p-md-6 p-lg-7"}>
                   <div className={"p-grid"} style={{float: "right"}}>
                       <Button label={clip.likes > 0 ? clip.likes.toString() : ""} disabled={!isLoggedIn} icon={"pi pi-thumbs-up"} className={"p-button-sm p-button-text"} style={{color: clip.isLiked ? "#81C784" : ""}} tooltip={!isLoggedIn ? "Login to like" : "Like"} tooltipOptions={{position: "bottom"}} onClick={() => likeClip(clip.id)}/>
                       <Button label={clip.dislikes > 0 ? clip.dislikes.toString() : ""} disabled={!isLoggedIn} icon={"pi pi-thumbs-down"} className={"p-button-sm p-button-text"} style={{color: clip.isDisliked ? "#81C784" : ""}} onClick={() => dislikeClip(clip.id)} tooltip={!isLoggedIn ? "Login to dislike": "Dislike"} tooltipOptions={{position: "bottom", }} />
                       <Button icon={"pi pi-ellipsis-v"} className={"p-button-sm p-button-text"} onClick={(e) => optionsRef.current.toggle(e)} />
                       <Menu model={optionsModel} ref={optionsRef} popup />
                       
                       {!isMobile && <Button label={"SHARE"} icon={"fas fa-share"} className={"share-btn p-button-sm p-button-text"} onClick={() => showAlert("info", "Copied", "Url copied to clipboard!")} />}
                       
                   </div> 
            </div>
            </div>
        </Fragment>
    )
}

export default observer(ClipAction);

