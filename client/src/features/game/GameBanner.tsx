import React, {useContext} from "react";
import {IGame} from "../../infrastructure/models/game";
import {Link} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";

interface IProps{
    game: IGame
}

const GameBanner: React.FC<IProps> = ({game}) => {
        const {isLoggedIn} = useContext(rootStoreContext).authStore;
    const {likeGame, likingGame, unlikeGame, target} = useContext(rootStoreContext).gameStore;
    return (
            <div className={"game"}>
                <Link to={`/games/${game.id}`} style={{textDecoration: "none", color: "#fff"}}>
                <img src={game.background_Image} alt={"game-banner"} />
                </Link>
                <div style={{marginTop: "0.2em", padding: "0.5em"}}>
                    <Link to={`/games/${game.id}`} style={{textDecoration: "none", color: "#fff"}}>
                    <span style={{fontSize: "0.9em", fontWeight: "bold", width: "100%"}} className={"gamelink truncate"}>{game.name}</span>
            <span style={{fontSize: "0.8em", color: "#777777", display: "block", marginTop: "0.2em"}}>Release: {game.released}</span>
                    </Link>
                    <div className={"triggers-games"}>
                        <span className={"rating"}><i className={"pi pi-star-o"} style={{fontSize: "0.9em"}} /> {game.rating}</span>
                        {isLoggedIn && (game.isLiked ? (<Button tooltip={"unlike"} icon={likingGame && target === game.id ? "pi pi-spin pi-spinner" : "pi pi-heart"} className={"p-button-rounded p-button-sm p-button-plain p-button-text like-game-button"} style={{color: "white", backgroundColor: "#D9381E"}} onClick={(event) => unlikeGame(event, game.id)} />) : (<Button tooltip={"like"} icon={likingGame && target === game.id ? "pi pi-spin pi-spinner" : "pi pi-heart"} className={"like-game-button p-button-rounded p-button-sm p-button-text p-button-plain"} style={{backgroundColor: "white",color: "#777777"}} onClick={(event) => likeGame(event, game.id)} />))}
                    </div>
                </div>
        </div>
    )
}

export default observer(GameBanner);