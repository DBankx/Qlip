import React from "react";
import {observer} from "mobx-react-lite";
import { IClip } from "../../../infrastructure/models/clip";
import {Button} from "primereact/button";
import ChannelClip from "../ChannelClip";
import {useMediaQuery} from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface IProps{
    channelClips: IClip[]
}

const RecentClips: React.FC<IProps> = ({channelClips}) => {
const isMobile = useMediaQuery({query: "(max-width: 500px)"});
    const isMobileSmaller = useMediaQuery({query: "(max-width: 500px)"});
    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        centerPadding: "10px"
    }
    return (
        <div>
            <div style={{display: "flex", alignItems: "center"}}>
            <span style={{fontSize: "0.9em"}}>Recent uploads</span>
                {!isMobile && (<Button label={"Play all recent"} icon={"pi pi-play"} className={"p-button-text p-button-plain p-ml-3"} />)}
            </div>
            <div style={{marginTop: "1em"}} className={isMobile ? "" : "p-grid p-ai-center"}>
                {isMobile ? (
                    <div style={{width: "100%"}}>
                    <Slider {...sliderSettings}>
                        {channelClips.slice(0, 5).map((clip: IClip) => (
                        <ChannelClip clip={clip} />
                        ))} 
                    </Slider>
                    </div>
                ) :  (channelClips.slice(0, 5).map((clip: IClip) => (
                        <ChannelClip clip={clip} />
                    )))}
               
            </div>
        </div>
    )
}

export default observer(RecentClips);