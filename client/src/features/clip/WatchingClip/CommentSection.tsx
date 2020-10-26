import React from "react";
import {observer} from "mobx-react-lite";
import Comment from "../../comment/Comment";
import {SplitButton} from "primereact/splitbutton";
import CommentInput from "../../comment/CommentInput";


const CommentSection = () => {
    return (
        <div className={"comment-box"}>
            <div className={"p-d-flex p-ai-center p-jc-between"}>
                <span>1263 Comments</span>
                <SplitButton label={"SORT BY"} icon={"pi pi-filter"} className={"p-button-sm p-button-secondary"}  />
            </div>
            <CommentInput />
            <Comment />
        </div>
    )
}

export default observer(CommentSection);