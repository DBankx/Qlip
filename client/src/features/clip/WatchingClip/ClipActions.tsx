import React, { Fragment } from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import {observer} from "mobx-react-lite";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";

interface IProps{
    clip: IClip
}

// dayjs config
dayjs.extend(relativeTime);

const ClipAction: React.FC<IProps> = ({clip}) => {
  
    return (
        <Fragment>
            <div className={"p-grid p-ai-center p-justify-between small-lines"}>
                {/*clip details*/}
                <div className={"p-col-4 p-md-4 p-lg-4 p-sm-2"}>
                          <span className={"clip-detail-line"} >
                                200K Views 
                            </span>
                    <span className={"clip-detail-line hide-sm"}>
                        {" "}• {dayjs(clip.createdAt).fromNow()}
                    </span>
                </div>

                {/*clip trigger buttons*/}
                <div className={"p-col-8 p-md-4 p-lg-4"}>
                    <div className={"p-grid p-ai-center"}>
                        <div className={"p-lg-2 p-sm-3"}>
                            <Button icon={"pi pi-thumbs-up"} className={"p-button-sm p-button-text"}/>
                        </div>
                        <div className={"p-lg-2 p-sm-3"}>
                            <Button icon={"pi pi-thumbs-down"} className={"p-button-sm p-button-text"}/>
                        </div>
                        <div className={"p-lg-2 p-sm-3"}>
                            <Button icon={"pi pi-bookmark"} className={"p-button-sm p-button-text"}/>
                        </div>
                        <div className={"p-lg-2 p-sm-3 hide-xs"}>
                            <Button icon={"pi pi-ellipsis-v"} className={"p-button-sm p-button-text"}/>
                        </div>
                        <div className={"p-lg-2 hide-md"}>
                            <Button label={"SHARE"} icon={"pi pi-share-alt"} className={"p-button-sm p-button-text"}/>
                        </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

export default observer(ClipAction);

