import React from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import ReactPlayer from "react-player";
import {Button} from "primereact/button";
import {Slider} from "primereact/slider";

interface IProps{
    clip: IClip
}

const ClipPlayer: React.FC<IProps> = ({clip}) => {
    
    return (
        <div className={"p-mt-2 clip-video-container"}>
            <ReactPlayer url={clip.url} style={{position: "relative", width: "100%"}} className={"clip-player"} width={"100%"}/>
            <div className={"clip-player-controls"}>
                {/*Top controls*/}
                <div className={"p-grid p-align-center vertical-container p-jc-between"} style={{padding: "0.5em 1em 0 1em"}}>
                    <div className={"p-col-12 p-lg-10 pg-md-10 pg-sm-10"}>
                        <p style={{color: "#fff"}}>{clip.title}</p>
                    </div>  
                    <div className={"p-col-12 p-lg-2 pg-md-2 pg-sm-2"}>
                        <Button label={"Save"} className={"p-button-sm p-button-outlined"} style={{left: "0", borderColor: "#fff", color: "#ddd"}} icon={"pi pi-bookmark"} />
                    </div>
                </div>
                {/*Top controls*/}
                
                {/*Middle controls*/}
                <div className={"p-grid p-align-center vertical-container p-jc-center middle-trigger"} style={{padding: "0.5em 1em 0 1em"}}>
                    <Button icon={"pi pi-fast-backward"} className={"p-button-rounded p-button-text clip-player-trigger-middle"} />
                    <Button icon={"pi pi-play"} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
                    <Button icon={"pi pi-fast-forward"} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
                </div>
                {/*Middle controls*/}
                
                {/*Bottom controls*/}
                <div className={"p-grid p-align-center vertical-container "} style={{padding: "0.5em 1em 0 1em"}}>
                    <div className={"p-col-12 p-lg-12"}>
                        <Slider value={20} min={0} max={100}  />
                    </div>

                    <div className={"p-grid p-align-center vertical-container"}>
                        <div>
                            <Button icon={"pi pi-play"} className={"clip-player-trigger-bottom p-button-rounded p-button-lg p-button-text"} />
                        </div>
                        <div>
                            <Button icon={"pi pi-volume-up"} className={"clip-player-trigger-bottom p-button-rounded p-button-lg p-button-text"} />
                          
                        </div>
                        <div className={"slider-volume"} style={{width: "100px"}}>
                        <Slider value={100} min={0} max={100} />
                        </div>
                        <div className={"time-display"}>
                           <Button>05:00</Button> 
                        </div>
                    </div>
                </div>

                
                {/*Bottom controls*/}
            </div>
        </div>
    )
}

export default observer(ClipPlayer);