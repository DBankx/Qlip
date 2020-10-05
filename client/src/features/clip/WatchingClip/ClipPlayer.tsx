import React from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import ReactPlayer from "react-player";
import {Button} from "primereact/button";
import {Slider} from "primereact/slider";
import {isMobile} from "react-device-detect";

interface IProps{
    clip: IClip
}

const ClipPlayer: React.FC<IProps> = ({clip}) => {
    
    return (
        <div className={"p-mt-2 clip-video-container"}>
            <ReactPlayer url={clip.url} style={{position: "relative", width: "100%"}} className={"clip-player"} width={"100%"}/>
            
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
                    <Button icon={"pi pi-play"} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
                    <Button icon={"pi pi-fast-forward"} className={"p-button-rounded p-button-text clip-play-trigger-middle"} />
                </div>
                {/*Middle controls*/}
                
                {/*Bottom controls*/}
                <div className={"p-grid p-align-center vertical-container"} style={{padding: "0.5em 1em 0 1em"}}>
                    <div className={"p-col-12 p-lg-12"}>
                        <div className={"p-grid p-ai-center"}>
                            <div className={"p-col-10 p-md-12 p-lg-12 p-sm-10 p-xl-12"}>
                                <Slider value={20} min={0} max={100}  />
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
                                        <Button icon={"pi pi-play"} className={"p-button-text p-button-plain p-button-sm"} />
                                    </div>
                                    
                                    <div className={"p-col-7"}>
                                        
                                        <div className={"p-grid p-ai-center"}>
                                            
                                        <div className={"p-col-3"}>
                                            <Button className={"p-button-text p-button-plain p-button-sm"} icon={"pi pi-volume-up"} />
                                        </div>
                                        <div className={"p-col-9 slider-volume"}>
                                            <Slider max={100} min={0} value={20} />
                                        </div>
                                            
                                        </div>
                                        
                                    </div>
                                    
                                    <div className={"p-col-3"}>
                                        <Button label={"50:55"} className={"p-button-text p-button-plain p-button-sm"} />
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                            
                            <div className={"p-col-4 p-md-3 p-sm-3 p-offset-6 p-sm-offset-4 p-md-offset-4"}>
                                
                                <div className={"p-grid p-ai-center"}>
                                
                                <div className={"p-col-3 p-offset-6 p-md-offset-4 p-md-4 p-sm-4 p-sm-offset-4 "}>
                                    <Button label={"1x"} className={"p-button-text p-button-plain p-button-sm"} />
                                </div>
                                    
                                    <div className={"p-col-3 p-md-4 p-sm-4"}>
                                    <Button className={"p-button-text p-button-plain p-button-sm"} icon={"pi pi-window-maximize"} />    
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        
                        </div>
                    </div>
                </div>
                {/*Bottom controls*/}
            </div>
    )
}

export default observer(ClipPlayer);




    