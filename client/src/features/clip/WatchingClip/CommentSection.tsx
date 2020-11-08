import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import Comment from "../../comment/Comment";
import {SplitButton} from "primereact/splitbutton";
import CommentInput from "../../comment/CommentInput";
import {IClip, IComment} from "../../../infrastructure/models/clip";
import rootStoreContext from "../../../application/stores/rootStore";

interface IProps{
    clip: IClip;
}

const CommentSection : React.FC<IProps> = ({clip}) => {
    const channelSortOptions = [
        {
            label: "Newest comment"
        },
        {
            label: "Oldest comment"
        }
    ]
    const {startConn, stopHubConnection} = useContext(rootStoreContext).clipStore;
    useEffect(() => {
        startConn(clip.id);
        return () => {
            stopHubConnection();
        }
    }, [startConn, stopHubConnection, clip])
    return (
        <div className={"comment-box"}>
            <div className={"p-d-flex p-ai-center p-jc-between"}>
                <span>1263 Comments</span>
                <SplitButton label={"SORT BY"} icon={"pi pi-filter"} className={"p-button-sm p-button-secondary"} model={channelSortOptions}  />
            </div>
            <CommentInput />
            {clip && clip.comments && clip.comments.map((comment: IComment) => (
                <div key={comment.id}>
                    <Comment comment={comment} clip={clip}/>
                </div>
            ))}
        </div>
    )
}

export default observer(CommentSection);