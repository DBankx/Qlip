import React, {useContext, useState} from "react";
import rootStoreContext from "../stores/rootStore";
import Slider from "rc-slider";
import {observer} from "mobx-react-lite";

interface IProps{
    playerRef: any
}

const {createSliderWithTooltip} = Slider;
const SliderWithTooltip = createSliderWithTooltip(Slider);

const ClipSlider: React.FC<IProps> = ({playerRef}) => {
    
    const {played, seek, seeking, updatePlayed, stopSeeking, elapsedTime} = useContext(rootStoreContext).clipPlayerStore;
    
    const [visible, setVisible] = useState<boolean>(false);
    
    return(
     <SliderWithTooltip tipFormatter={() => elapsedTime}  onBlur={() => setVisible(!visible)} value={played * 100} min={0} max={100} defaultValue={0} onBeforeChange={seek} onChange={(e) => updatePlayed(e/100)} onAfterChange={(e) => {
            stopSeeking();
            playerRef.current.seekTo(e/100);
        }} /> 
    )
}
export default observer(ClipSlider);