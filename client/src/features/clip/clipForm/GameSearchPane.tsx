import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import CreateGameDropdownList from "./CreateGameDropdownList";
import GameSearchPanePlaceholder from "./GameSearchPanePlaceholder";

interface IProps{
    gameName: string;
    setFieldValue: any;
}

const GameSearchPane : React.FC<IProps> = ({gameName, setFieldValue}) => {
    const {searchGamesByName, loadingGames, games} = useContext(rootStoreContext).gameStore;
    const {toggleGameSearchPaneOff} = useContext(rootStoreContext).gameStore;
    useEffect(() => {
       if(gameName.length > 0){
           searchGamesByName(gameName);
       } 
    }, [gameName, searchGamesByName])
    return (
        <div id="game-search-pane" className="game-search-pane">
            <div style={{width: "100%", padding: "0.5em", marginBottom: "1em"}}>
                <i className="pi pi-times" onClick={() => toggleGameSearchPaneOff()} style={{float: "right", color: "#777777"}} />
            </div>
            {loadingGames ? <GameSearchPanePlaceholder /> : (
                games && games.data.length > 0 ? games.data.map((game) => (
                    <div key={game.id}>
                        <CreateGameDropdownList setFieldValue={setFieldValue} game={game} gameName={gameName} />       
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