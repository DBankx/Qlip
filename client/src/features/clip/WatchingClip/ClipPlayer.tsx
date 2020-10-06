import React, {useContext, useRef, Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import ReactPlayer from "react-player";
import ClipPlayerControls from "./ClipPlayerControls";
import rootStoreContext from "../../../application/stores/rootStore";
import * as screenfull from "screenfull";
import {Screenfull} from "screenfull";

interface IProps{
    clip: IClip
}



// counter for caluclating the idle time
let count = 0;

const ClipPlayer: React.FC<IProps> = ({clip}) => {
    const playerContainerRef = useRef<any>(null);
    const playerRef = useRef<any>(null);
    const controlsRef = useRef<any>(null);
    
    function onToggleFullScreen(){
        (screenfull as Screenfull).toggle(playerContainerRef.current);
    }
    
    const {playing, muted, volume, updatePlayed, seeking, setDuration, setElapsedTime, timeDisplayFormat} = useContext(rootStoreContext).clipPlayerStore;
    
    const handleMouseMove = () => {
        controlsRef.current.style.visibility = "visible";
    }
    
    const handleProgress = (played: number) => {
        if(!seeking) updatePlayed(played);
        if(count > 3){
            controlsRef.current.style.visibility = "hidden";
            count = 0;
        }
        if(controlsRef.current.style.visibility === "visible"){
            count += 1;
        }
    }
    
    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : "00:00";
    const duration = playerRef.current ? playerRef.current.getDuration() : "00:00";
    
    const remainingTime = duration - currentTime;
    
    useEffect(() => {
        setDuration(duration);
        setElapsedTime( timeDisplayFormat == "normal" ? currentTime : remainingTime);
    }, [setDuration, setElapsedTime, duration, currentTime])
    
    return (
        <Fragment>
        <div ref={playerContainerRef} className={"p-mt-2 clip-video-container"} onMouseMove={handleMouseMove}>
            <div className={"video-clip"}>
            <ReactPlayer ref={playerRef} id={"clip-player"} playing={playing} url={clip.url} muted={muted} volume={volume} className={"clip-player"} width={"100"} onProgress={({played}) => handleProgress(played)} />
            </div>
            <div>
            <ClipPlayerControls playerRef={playerRef} clip={clip} onToggleFullScreen={onToggleFullScreen} controlsRef={controlsRef} />
            </div>
        </div>
        </Fragment>
    )
}

export default observer(ClipPlayer);




    