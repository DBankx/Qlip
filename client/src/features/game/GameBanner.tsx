import React from "react";
import {IGame} from "../../infrastructure/models/game";

interface IProps{
    game: IGame
}

const GameBanner: React.FC<IProps> = ({game}) => {
    return (
        <div className={"clip-box p-mr-2 p-p-2 p-mb-2clip-box p-mr-2 p-p-2 p-mb-2"}>
            hey
        </div>
    )
}

export default GameBanner;