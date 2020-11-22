import React from "react";
import {IGame} from "../../../infrastructure/models/game";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import {history} from "../../../index";

interface IProps{
    game: IGame
}

const GameHeader : React.FC<IProps> = ({game}) => {
    return (
        <div>
            <Button style={{marginBottom: "1em"}} label={"Back to games"} icon={"pi pi-arrow-left"} className={"p-button-text p-button-sm"} onClick={() => history.push("/games")} />
            <div className={"p-grid p-ai-center border-bottom"}>
                <div className={"p-col-12 p-md-4 p-sm-12 p-lg-4"}>
            <img src={game.background_Image} alt={"game-banner"} style={{width: "100%"}} />
                </div>
                <div className={"p-col-12 p-sm-12 p-md-8 p-lg-8"}>
                    <h1>{game.name}</h1>
                    <div className={"floater text-sm text-sub"} style={{marginTop: "0.3em", color: "#999999"}}>
                        <span><b>{game.clips?.length}</b> Qlip(s)</span>
                        <span style={{margin: "0 10px"}}>•</span>
                        <span><i className={"pi pi-star-o"} /> {game.rating} rating</span>
                        <span style={{margin: "0 10px"}}>•</span>
                        <span><i className={"pi pi-calendar"} /> {game.released}</span>
                    </div>
                    <Button label={"Add Qlip"} onClick={() => history.push("/create")} icon={"pi pi-video"} className={"p-button-sm p-button-outlined"} style={{marginTop: "1em"}} />
                </div>
            </div>
        </div>
    )
}

export default observer(GameHeader);