import React from "react";
import {observer} from "mobx-react-lite";
import { IChannel } from "../../../infrastructure/models/channel";
import {Button} from "primereact/button";
import ChannelClip from "../ChannelClip";
import {useMediaQuery} from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {IClip} from "../../../infrastructure/models/clip";

interface IProps{
    channel: IChannel 
}

const RecentClips: React.FC<IProps> = ({channel}) => {
const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        centerPadding: "15px"
    }
    return (
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "0.9em"}}>Recent uploads</span>
                {!isMobile && (<Button label={"Play all recent"} icon={"pi pi-play"} className={"p-button-text p-button-plain p-ml-3"} />)}
            </div>
            <div style={{marginTop: "1em"}} className={isMobile ? "" : "p-grid p-ai-center"}>
                {channel.clips.length > 0 ? (isMobile ? (
                    <div style={{width: "100%"}}>
                    <Slider {...sliderSettings}>
                        {channel.clips.slice(0, 4).map((clip: IClip) => (
                            <div key={clip.id}>
                        <ChannelClip clip={clip} />
                            </div>
                        ))} 
                    </Slider>
                    </div>
                ) :  (channel.clips.slice(0, 4).map((clip: IClip) => (
                        <div key={clip.id} className={"p-col-12 p-lg-3 p-md-5 p-sm-6"}>
                        <ChannelClip clip={clip} />
                    </div>
                )))) :  <span>{channel.isUser ? "You have not uploaded any qlips recently": <span>{channel.username} has not uploaded any qlips recently</span>}</span>}
            </div>
        </div>
    )
}

export default observer(RecentClips);