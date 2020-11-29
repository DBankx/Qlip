import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import CreateGameDropdownList from "./CreateGameDropdownList";
import GameSearchPanePlaceholder from "./GameSearchPanePlaceholder";

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
            {loadingGames ? <GameSearchPanePlaceholder /> : (
                games && games.data.length > 0 ? games.data.map((game) => (
                    <div key={game.id}>
                        <CreateGameDropdownList game={game} />       
                    </div>
                )) : (<div className="p-text-center" style={{margin: "4em auto", fontWeight: 600, color: "#777777"}}>
                        <div>
                            <p>Game wasnt found in our database :(</p>
                            <p>Please check your spelling</p>
                        </div>
                    </div>
                )
            ) } 
        </div>
    )
}

export default observer(GameSearchPane);