import React, {Fragment, useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import plyr from "plyr";
import "plyr/dist/plyr.css";
import rootStoreContext from "../../../application/stores/rootStore";
import {history} from "../../../index";

interface IProps{
    clip: IClip
}

const ClipPlayer: React.FC<IProps> = ({clip}) => {
    const {UpNextClips, autoPlay} = useContext(rootStoreContext).clipStore;
    const [end, setEnded] = useState<boolean>(false);
    const options = {
        controls: ['play-large', 'play','pause', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
            i18n: {
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
        autoplay: false
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

        
        
        player.on("ended", (() => {
            if(UpNextClips!.data.length > 0 && autoPlay){
                setEnded(!end);
                setTimeout(()=> {
                    history.push(`/qlip/${UpNextClips!.data[0].id}`)
                }, 2000)
            }
        }));
        
    return () => {
            player.destroy();
        };
    }, [clip, options]);
    
    return (
        <Fragment>
        <div className={"p-mt-2 p-shadow-7"} style={{position: "relative"}} >
           <video className={"js-plyr plyr"} />
            {end && UpNextClips!.data.length > 0 && <div className="playing-next">
               <div>
                   PLAYING NEXT...
               </div>
           </div> }
        </div>
        </Fragment>
    )
}


export default observer(ClipPlayer);




    