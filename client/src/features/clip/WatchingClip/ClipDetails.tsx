import React from "react";
import {observer} from "mobx-react-lite";
import ClipOwnerDetails from "./ClipOwnerDetails";
import ClipPlayer from "./ClipPlayer";
import {IClip} from "../../../infrastructure/models/clip";
import ClipTitle from "./ClipTitle";
import ClipAction from "./ClipActions";
import ClipDescription from "./ClipDescription";
import CommentSection from "./CommentSection"; 

interface IProps{
    clip: IClip
}

const ClipDetails: React.FC<IProps> = ({clip}) => {
    return (
        <div style={{width: "100%"}}>
            <ClipOwnerDetails clip={clip} />
            <hr className={"divider"} />
            <ClipPlayer clip={clip} />
            <ClipTitle clip={clip} />
            <ClipAction clip={clip} />
            <ClipDescription clip={clip} />
            <hr className={"divider p-mt-3 p-mb-3"} />
            <CommentSection />
        </div>
    )
}

export default observer(ClipDetails);