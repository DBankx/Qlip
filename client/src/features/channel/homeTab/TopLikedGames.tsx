import React from "react";
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
    const sliderSettings = {
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
                <p style={{fontWeight: 600, color: "#777777"}}>Favorite games</p>
            </div>
                <div style={{marginTop: "1em"}} className={isMobile ? "" : "p-grid p-ai-center"}>
                {channel.likedGames.length > 0 ? (isMobile ? (
                    <div style={{width: "100%"}}>
                        <Slider {...sliderSettings}>
                            {channel.likedGames.map((game: IGame) => (
                                <ChannelGame game={game} /> 
                            ))}
                        </Slider>
                    </div>
                ) :  (channel.likedGames.map((game: IGame) => (
                    <div key={game.id} className={"p-col-12 p-md-4 p-lg-3 p-sm-6"}>
                    <ChannelGame game={game} />
                    </div>
                )))) : channel.isUser ? <span>You havent liked any games recently</span> : <span>{channel.username} havent liked any games recently</span>} 
            </div>
        </div>
    )
}

export default observer(TopLikeGames);