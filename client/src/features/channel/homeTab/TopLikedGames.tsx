﻿import React from "react";
import {observer} from "mobx-react-lite";
import { IGame } from "../../../infrastructure/models/game";
import { IChannel } from "../../../infrastructure/models/channel";
import {Button} from "primereact/button";
import {useMediaQuery} from "react-responsive";
import Slider from "react-slick";
import ChannelGame from "../ChannelGame";

interface IProps{
    channel: IChannel
}

const TopLikeGames: React.FC<IProps> = ({channel}) => {
    const isMobile = useMediaQuery({query: "(max-width: 600px)"});
    const isMobileBigger = useMediaQuery({query: "(max-width: 668px)"});
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
                <span style={{fontSize: "0.9em"}}>Recent Fav games</span>
                {!isMobile && (<Button label={"View all Favorite games"} icon={"pi pi-eye"} className={"p-button-text p-button-plain p-ml-3"} />)}
            </div>
                <div style={{marginTop: "1em"}} className={isMobile ? "" : "p-grid p-ai-center"}>
                {channel.likedGames.length > 0 ? (isMobile ? (
                    <div style={{width: "100%"}}>
                        <Slider {...sliderSettings}>
                            {channel.likedGames.slice(0, 5).map((game: IGame) => (
                                <ChannelGame game={game} /> 
                            ))}
                        </Slider>
                    </div>
                ) :  (channel.likedGames.slice(0, 5).map((game: IGame) => (
                    <div key={game.id} className={"p-col-12 p-md-3 p-lg-3 p-sm-6"}>
                    <ChannelGame game={game} />
                    </div>
                )))) : channel.isUser ? <span>You havent liked any games recently</span> : <span>{channel.username} havent liked any games recently</span>} 
            </div>
        </div>
    )
}

export default observer(TopLikeGames);