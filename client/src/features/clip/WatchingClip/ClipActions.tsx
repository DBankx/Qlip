import React, {Fragment, useContext, useRef} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import {observer} from "mobx-react-lite";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import {Menu} from "primereact/menu";
import rootStoreContext from "../../../application/stores/rootStore";
import {history} from "../../../index";

interface IProps{
    clip: IClip
}

// dayjs config
dayjs.extend(relativeTime);

const ClipAction: React.FC<IProps> = ({clip}) => {
    
    const {deleteClip, deletingClip} = useContext(rootStoreContext).clipStore;
    
    const optionsRef = useRef<any>(null);
    
    const optionsModel = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Report',
                    icon: 'pi pi-envelope'
                },
                {
                    label: 'Delete',
                    icon: deletingClip ? "pi pi-spin pi-spinner" : "pi pi-times",
                    command: () => deleteClip(clip.id).then(() => history.push("/"))
                }
            ]
        }
    ];
  
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
                            <Button icon={"pi pi-ellipsis-v"} onClick={(event) => optionsRef.current.toggle(event)} className={"p-button-sm p-button-text"} aria-controls="popup_menu" aria-haspopup/>
                            <Menu popup={true} id={"popup_menu"} ref={optionsRef} model={optionsModel} />
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

