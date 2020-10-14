import React from "react";
import {IGame} from "../../../infrastructure/models/game";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";

interface IProps{
    game: IGame
}

const GameHeader : React.FC<IProps> = ({game}) => {
    return (
        <div>
            <div className={"p-grid p-ai-center border-bottom"}>
                <div className={"p-col-4"}>
            <img src={game.background_Image} alt={"game-banner"} style={{width: "100%"}} />
                </div>
                <div className={"p-col-8"}>
                    <h1>{game.name}</h1>
                    <div className={"floater"} style={{marginTop: "0.3em", color: "#999999", fontSize: "1.2rem"}}>
                        <span><b>{game.clips?.length}</b> Video(s)</span>
                        <span style={{margin: "0 10px"}}>•</span>
                        <span><i className={"pi pi-star-o"} /> {game.rating} rating</span>
                        <span style={{margin: "0 10px"}}>•</span>
                        <span><i className={"pi pi-calendar"} /> {game.released}</span>
                    </div>
                    <Button label={"Add Qlip"} icon={"pi pi-video"} className={"p-button-sm p-button-outlined"} style={{marginTop: "1em"}} />
                </div>
            </div>
        </div>
    )
}

export default observer(GameHeader);