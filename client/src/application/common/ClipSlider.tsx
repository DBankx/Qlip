import React, {useContext} from "react";
import rootStoreContext from "../stores/rootStore";
import Slider from "rc-slider";

interface IProps{
    playerRef: any
}

const {createSliderWithTooltip} = Slider;


const ClipSlider: React.FC<IProps> = ({playerRef}) => {
    
    const {played, seek, seeking, updatePlayed, stopSeeking} = useContext(rootStoreContext).clipPlayerStore;
    
    return(
        <Slider value={played * 100} min={0} max={100} defaultValue={0} onBeforeChange={seek} onChange={(e) => updatePlayed(e/100)} onAfterChange={(e) => {
            stopSeeking();
            playerRef.current.seekTo(e/100);
        }} />
    )
}
/*
* onchange={handleseekchange}
* onMouseDown={handleSeekMouseDown}
* onchangeCommitted={handleseekmouseup}
* */
export default ClipSlider;