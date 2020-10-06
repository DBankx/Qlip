import React from "react";
import {observer} from "mobx-react-lite";
import AvatarClip from "../../../application/common/AvatarClip";
import {Button} from "primereact/button";

const ClipOwnerDetails = () => {
    return (
        <div className={"p-d-flex p-flex-wrap p-jc-between p-ai-center"}>
            <AvatarClip />
            <Button label={"Subscribe"} className={"p-button-sm"} icon={"pi pi-plus"} />
        </div>
    )
}

export default observer(ClipOwnerDetails);