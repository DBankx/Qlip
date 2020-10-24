import React, {Fragment, useContext, useRef} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import {observer} from "mobx-react-lite";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import {Menu} from "primereact/menu";
import rootStoreContext from "../../../application/stores/rootStore";
import {history} from "../../../index";
import {useMediaQuery} from "react-responsive";

interface IProps{
    clip: IClip
}

// dayjs config
dayjs.extend(relativeTime);

const ClipAction: React.FC<IProps> = ({clip}) => {
    
    const {deleteClip, deletingClip, likeClip, dislikeClip} = useContext(rootStoreContext).clipStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    
    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    
    const optionsRef = useRef<any>(null);
    
    const optionsModel = [
                {
                    label: 'Report',
                    icon: 'far fa-flag'
                },
                {
                    label: 'Delete',
                    icon: deletingClip ? "pi pi-spin pi-spinner" : "pi pi-times",
                    command: () => deleteClip(clip.id).then(() => history.push("/"))
                }
    ];
  
    return (
        <Fragment>
            <div className={"p-grid p-ai-center p-justify-between small-lines"}>
                {/*clip details*/}
                <div className={"p-col-3 p-md-4 p-lg-3 p-sm-2"}>
                          <span className={"clip-detail-line"} >
                              {clip.views} Views 
                            </span>
                    <span className={"clip-detail-line hide-sm"}>
                        {" "}• {dayjs(clip.createdAt).fromNow()}
                    </span>
                </div>

                {/*clip trigger buttons*/}
                <div className={"p-col-9 p-md-6 p-lg-6"}>
                   <div className={"p-grid"} style={{float: "right"}}>
                       <Button label={clip.likes > 0 ? clip.likes.toString() : ""} disabled={!isLoggedIn} icon={"pi pi-thumbs-up"} className={"p-button-sm p-button-text"} style={{color: clip.isLiked ? "#81C784" : ""}} tooltip={!isLoggedIn ? "Login to like" : "Like"} tooltipOptions={{position: "bottom"}} onClick={() => likeClip(clip.id)}/>
                       <Button label={clip.dislikes > 0 ? clip.dislikes.toString() : ""} disabled={!isLoggedIn} icon={"pi pi-thumbs-down"} className={"p-button-sm p-button-text"} style={{color: clip.isDisliked ? "#81C784" : ""}} onClick={() => dislikeClip(clip.id)} tooltip={!isLoggedIn ? "Login to dislike": "Dislike"} tooltipOptions={{position: "bottom", }} />
                       <Button icon={"pi pi-ellipsis-v"} className={"p-button-sm p-button-text"} onClick={(e) => optionsRef.current.toggle(e)} />
                       <Menu model={optionsModel} ref={optionsRef} popup />
                       <Button label={"SHARE"} icon={"fas fa-share"} className={"p-button-sm p-button-text"} />
                       
                   </div> 
            </div>
            </div>
        </Fragment>
    )
}

export default observer(ClipAction);

