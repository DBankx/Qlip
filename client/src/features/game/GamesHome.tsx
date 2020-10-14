import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import GameBanner from "../../features/game/GameBanner";

const GamesHome = () => {
    const {loadGames, loadingGames, pageSize, pageNumber, games} = useContext(rootStoreContext).gameStore;
    useEffect(() => {
        loadGames();
    }, [loadGames, pageSize, pageNumber])
    
    if(loadingGames) return <Spinner />
        
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            <div className={"p-grid"}>
                {games && games.data.map(game => (
                    <div key={game.id}>
                        <GameBanner game={game} />
                    </div>
                ))}
            </div>
            <div>
                Here is the pagination bit
            </div>
        </div>
    )
}

export default observer(GamesHome);