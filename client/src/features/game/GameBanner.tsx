import React from "react";
import {IGame} from "../../infrastructure/models/game";
import {Link} from "react-router-dom";

interface IProps{
    game: IGame
}

const GameBanner: React.FC<IProps> = ({game}) => {
  
    
    return (
        <Link to={`/games/${game.id}`} style={{textDecoration: "none", color: "#fff"}}>
            <div className={"game"}>
                <img src={game.background_Image} alt={"game-banner"} />
                <div style={{marginTop: "0.2em", padding: "0.5em"}}>
                    <span style={{fontSize: "0.9em", fontWeight: "bold"}} className={"gamelink tw-ellipsis"}>{game.name}</span>
            <span style={{fontSize: "0.8em", color: "#777777", display: "block", marginTop: "0.2em"}}>Release: {game.released}</span>
                    <span className={"rating"}><i className={"pi pi-star-o"} style={{fontSize: "0.9em"}} /> {game.rating}</span>
                </div>
        </div>
        </Link>
    )
}

export default GameBanner;