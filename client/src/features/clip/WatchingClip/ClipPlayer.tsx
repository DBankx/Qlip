import React, {useContext, useRef, Fragment} from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import ReactPlayer from "react-player";
import ClipPlayerControls from "./ClipPlayerControls";
import rootStoreContext from "../../../application/stores/rootStore";
import * as screenfull from "screenfull";
import {Screenfull} from "screenfull";
import formatVideoTime from "../../../infrastructure/HelperFunctions/formatVideoTime";

interface IProps{
    clip: IClip
}



const ClipPlayer: React.FC<IProps> = ({clip}) => {
    const playerContainerRef = useRef<any>(null);
    const playerRef = useRef<any>(null);
    
    function onToggleFullScreen(){
        (screenfull as Screenfull).toggle(playerContainerRef.current);
    }
    
    const {playing, muted, volume, updatePlayed, seeking} = useContext(rootStoreContext).clipPlayerStore;
    
    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
    const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";
    
    const elapsedTime = formatVideoTime(currentTime);
    const totalDuration = formatVideoTime(duration);
    
    return (
        <Fragment>
        <div ref={playerContainerRef} className={"p-mt-2 clip-video-container"}>
            <ReactPlayer ref={playerRef}  id={"clip-player"} playing={playing} url={clip.url}  muted={muted} volume={volume}  className={"clip-player"} width={"100"} onProgress={({played}) => {if(!seeking) updatePlayed(played)}} />
            <ClipPlayerControls playerRef={playerRef} clip={clip} onToggleFullScreen={onToggleFullScreen} elapsedTime={elapsedTime} totalDuration={totalDuration}/>
            </div>
        </Fragment>
    )
}

export default observer(ClipPlayer);




    