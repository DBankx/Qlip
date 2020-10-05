import React, {Fragment, useContext} from "react";
import {Button} from "primereact/button";
import {isMobile} from "react-device-detect";
import {Slider} from "primereact/slider";
import {IClip} from "../../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import ClipSlider from "../../../application/common/ClipSlider";

interface IProps{
    clip: IClip,
    onToggleFullScreen: () => void;
    playerRef: any,
    totalDuration: string,
    elapsedTime: string
}

const ClipPlayerControls: React.FC<IProps> = ({clip, onToggleFullScreen, playerRef, elapsedTime, totalDuration}) => {
    
    const {togglePlayButton, playing, toggleMute, muted, updateVolume, volume, played, updatePlayed, seek} = useContext(rootStoreContext).clipPlayerStore;
    
    return (
        <Fragment>
        {/* overlay controls */}
    <div className={"clip-player-controls"}>
        {/*Top controls*/}
        <div className={"p-grid p-align-center vertical-container p-jc-between"} style={{padding: "0.5em 1em 0 1em"}}>
            <div className={"p-col-10 p-lg-10 pg-md-10 pg-sm-10"}>
                <p style={{color: "#fff"}} className={"text-sm"}>{clip.title}</p>
            </div>
            <div className={"p-col-2 p-lg-2 pg-md-2 pg-sm-2"}>
                <Button label={isMobile? "" : "Save"} className={"p-button-sm p-button-outlined text-sm"} style={{left: "0", border: "0", color: "#ddd"}} icon={"pi pi-bookmark"} />
            </div>
        </div>
        {/*Top controls*/}

        {/*Middle controls*/}
        <div className={"p-grid p-align-center vertical-container p-jc-center middle-trigger"} style={{padding: "0.5em 1em 0 1em"}}>
            <Button icon={"pi pi-fast-backward"} className={"p-button-rounded p-button-text clip-player-trigger-middle"} />
            <Button icon={playing ? "pi pi-pause" : "pi pi-play"} onClick={() => togglePlayButton()} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
            <Button icon={"pi pi-fast-forward"} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
        </div>
        {/*Middle controls*/}

        {/*Bottom controls*/}
        <div className={"p-grid p-align-center vertical-container"} style={{padding: "0.5em 1em 0 1em"}}>
            <div className={"p-col-12 p-lg-12"}>
                <div className={"p-grid p-ai-center"}>
                    <div className={"p-col-10 p-md-12 p-lg-12 p-sm-10 p-xl-12"}>
                        <ClipSlider playerRef={playerRef} />
                    </div>
                    <div className={"p-sm-2 p-col-2 hide-bg"}>
                        <Button className={"p-button-text p-button-plain p-button-sm"} icon={"pi pi-window-maximize"} />
                    </div>
                </div>

            </div>
            <div className={"p-col-12 p-lg-12 p-sm-12 p-md-12 hide-sm"} style={{height: "60px"}} >

                <div className={"p-grid"}>

                    <div className={"p-col-4 p-md-5 p-sm-5"}>

                        <div className={"p-grid"}>

                            <div className={"p-col-2"}>
                                <Button icon={playing ? "pi pi-pause" : "pi pi-play"} onClick={() => togglePlayButton()} className={"p-button-text p-button-plain p-button-sm"} />
                            </div>

                            <div className={"p-col-7"}>

                                <div className={"p-grid p-ai-center"}>

                                    <div className={"p-col-3"}>
                                        <Button className={"p-button-text p-button-plain p-button-sm"} onClick={() => toggleMute()} icon={muted ? "pi pi-volume-off" : "pi pi-volume-up"} />
                                    </div>
                                    
                                    <div className={"p-col-9 slider-volume"}>
                                        <Slider max={10} min={0} disabled={muted}   value={muted ? 0 : muted ? 0 : volume * 10} step={1} onChange={(e) => updateVolume(e.value)} />
                                    </div>

                                </div>

                            </div>

                            <div className={"p-col-3"} style={{position: "relative"}}>
                                <span style={{fontSize: "13px", top: "400", position: "absolute"}}>
                                    {`${elapsedTime} / ${totalDuration}`}
                                </span>
                            </div>

                        </div>

                    </div>


                    <div className={"p-col-3 p-md-3 p-sm-3 p-offset-4 p-sm-offset-4 p-md-offset-4"}>

                        <div className={"p-grid p-ai-center"}>

                            <div style={{position: "relative"}}  className={"p-col-3 p-offset-6 p-md-offset-4 p-md-4 p-sm-4 p-sm-offset-4 "}>
                                 <Button id={"button-speed"} label={"1x"} className={"p-button-text p-button-plain p-button-sm"} />
                            </div>

                            <div className={"p-col-3 p-md-4 p-sm-4"}>
                                <Button className={"p-button-text p-button-plain p-button-sm"} icon={"pi pi-window-maximize"} onClick={() => onToggleFullScreen()} />
                            </div>

                        </div>

                    </div>

                </div>


            </div>
        </div>
    </div>
    {/*Bottom controls*/}
        </Fragment>
    )
}

export default observer(ClipPlayerControls);