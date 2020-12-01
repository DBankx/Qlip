import React, {useContext} from "react";
import {IGame} from "../../../infrastructure/models/game";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";

interface IProps{
    game: IGame;
    setFieldValue: any;
    gameName: string;
}

const CreateGameDropdownList : React.FC<IProps> = ({game, setFieldValue, gameName}) => {
    const {toggleGameSearchPaneOff, selectGame, selectedGame} = useContext(rootStoreContext).gameStore;
    if(gameName !== selectedGame){
        selectGame("");
    }
    return (
        <div onClick={() => {
            setFieldValue("gameName",game.name);
            selectGame(game.name);
            toggleGameSearchPaneOff();
        }} className="p-d-flex game-dropdown-list">
            <div>
                <img src={game.background_Image} alt="game" />
            </div>
            <div style={{marginLeft: "1em"}}>
                <p>{game.name}</p>
                <small style={{display: "block", color:"#777777", marginTop: "0.3em"}}>Released: {game.released}</small>
                <small style={{color: "#777777", marginTop: "0.3em"}}>Rating: {game.rating}</small>
            </div>
        </div>
    )
}

export default observer(CreateGameDropdownList);