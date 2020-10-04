import React from "react";
import {observer} from "mobx-react-lite";
import AvatarClip from "../../../application/common/AvatarClip";
import ClipOwnerDetails from "./ClipOwnerDetails";
import ClipPlayer from "./ClipPlayer";
import {IClip} from "../../../infrastructure/models/clip";

interface IProps{
    clip: IClip
}

const ClipDetails: React.FC<IProps> = ({clip}) => {
    return (
        <div style={{width: "100%"}}>
            <ClipOwnerDetails />
            <hr className={"divider"} />
            <ClipPlayer clip={clip} />
        </div>
    )
}

export default observer(ClipDetails);