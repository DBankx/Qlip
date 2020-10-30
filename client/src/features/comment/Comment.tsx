import React from "react";
import {observer} from "mobx-react-lite";
import { IComment } from "../../infrastructure/models/clip";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface IProps{
    comment: IComment
}

dayjs.extend(relativeTime);

const Comment: React.FC<IProps> = ({comment}) => {
    return (
        <div className={"p-d-flex"}>
            <div>
                <img src={comment.gravatarProfileImage} alt={"comment-user"} style={{borderRadius: "50%", width: "40px"}} />
            </div>
            <div  className={"p-col-11"}>
                <div>
                    <span style={{fontSize: "0.9em"}}>{comment.username}</span>
                    <span style={{fontSize: "0.9em", color: "#777777", marginLeft: "0.5em"}}>{dayjs(comment.postedAt).fromNow()}</span>
                </div>
                <div className={"p-mt-1"}>
                    <p style={{fontSize: "0.9em"}}>{comment.text}</p>
                </div>
            </div>
        </div>
    )
}

export default observer(Comment);