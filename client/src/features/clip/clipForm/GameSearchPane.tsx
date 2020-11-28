import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import CreateGameDropdownList from "./CreateGameDropdownList";

interface IProps{
    gameName: string;
}

const GameSearchPane : React.FC<IProps> = ({gameName}) => {
    const {searchGamesByName, loadingGames, games} = useContext(rootStoreContext).gameStore;
    useEffect(() => {
       if(gameName.length > 0){
           searchGamesByName(gameName);
       } 
    }, [gameName, searchGamesByName])
    return (
        <div className="game-search-pane">
            {loadingGames ? <Spinner /> : (
                games && games.data.map((game) => (
                    <div key={game.id}>
                        <CreateGameDropdownList game={game} />       
                    </div>
                ))
            )} 
        </div>
    )
}

export default observer(GameSearchPane);