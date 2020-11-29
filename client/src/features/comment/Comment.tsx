import React, {useContext, useRef} from "react";
import {observer} from "mobx-react-lite";
import {IClip, IComment} from "../../infrastructure/models/clip";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import rootStoreContext from "../../application/stores/rootStore";
import {history} from "../../index";

interface IProps{
    comment: IComment
    clip: IClip
}

dayjs.extend(relativeTime);

const Comment: React.FC<IProps> = ({comment, clip}) => {
    const {user} = useContext(rootStoreContext).authStore;
    const {deleteComment, deletingComment} = useContext(rootStoreContext).clipStore;
  const commentModelOptions = [
      {
          label: "Report",
          icon: "fas fa-flag",
          command: () => history.push(`/report/${comment.username}`)
      },
      {
          label: "Delete",
          icon: deletingComment ? "pi pi-spin pi-spinner" : "pi pi-trash",
          className: user && comment.username === user.username ? "" : "none",
          command: () => deleteComment(comment.id)
      }
    ]
    const ref = useRef<any>(null);
    return (
        <div className={"p-grid p-ai-center p-mt-3 p-mb-3 comment"}>
        <div className={"p-col-11 p-d-flex"}>
            <div>
                <img src={comment.gravatarProfileImage} alt={"comment-user"} style={{borderRadius: "50%", width: "40px"}} />
            </div>
            <div  className={"p-col-11"}>
                <div>
                    <span style={{fontSize: "0.9em"}}>{comment.username}</span>
                    <span style={{fontSize: "0.9em", color: "#777777", marginLeft: "0.5em"}}>{dayjs(comment.postedAt).fromNow()}</span>
                    {comment.username === clip.authorName && ( <span className={"label"} style={{fontWeight: 600}}>Creator</span>) }
                </div>
                <div className={"p-mt-3"}>
                    <p style={{fontSize: "0.9em"}}>{comment.text}</p>
                </div>
            </div>
        </div>
            <div className={"comment-options"}>
                <Menu model={commentModelOptions} ref={ref} popup id={"popup-menu"} appendTo={document.body} />
                <Button onClick={(e) => ref.current!.toggle(e)} className={"p-button-sm p-button-text p-button-plain"} icon={"pi pi-ellipsis-v"} aria-controls="popup_menu" aria-haspopup />
            </div>
        </div>
    )
}

export default observer(Comment);