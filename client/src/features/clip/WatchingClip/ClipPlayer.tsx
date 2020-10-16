import React, {Fragment, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import plyr from "plyr";
import "plyr/dist/plyr.css";

interface IProps{
    clip: IClip
}

const ClipPlayer: React.FC<IProps> = ({clip}) => {

    const options = {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            i18n: {
            restart: "Restart",
                rewind: "Rewind {seektime}s",
                play: "Play",
                pause: "Pause",
                fastForward: "Forward {seektime}s",
                seek: "Seek",
                seekLabel: "{currentTime} of {duration}",
                played: "Played",
                buffered: "Buffered",
                currentTime: "Current time",
                duration: "Duration",
                volume: "Volume",
                mute: "Mute",
                unmute: "Unmute",
                enableCaptions: "Enable captions",
                disableCaptions: "Disable captions",
                download: "Download",
                enterFullscreen: "Enter fullscreen",
                exitFullscreen: "Exit fullscreen",
                frameTitle: "Player for {title}",
                captions: "Captions",
                settings: "Settings",
                menuBack: "Go back to previous menu",
                speed: "Speed",
                normal: "Normal",
                quality: "Quality",
                loop: "Loop",
        },
        autoplay: true
    };
    
    useEffect(() => {
        const player = new plyr(".js-plyr", options);
        
        player.source = {
            type: "video",
            sources: [
            {
                src: clip.url,
            },
        ],
    };


    return () => {
            player.destroy();
        };
    }, [clip, options]);
    
    return (
        <Fragment>
        <div className={"p-mt-2"} >
           <video className={"js-plyr plyr"} />
        </div>
        </Fragment>
    )
}


export default observer(ClipPlayer);




    