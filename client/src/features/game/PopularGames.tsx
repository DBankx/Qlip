import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import GamesPlaceholder from "./GamesPlaceholder";

const PopularGames = () => {
    const {sortGamesByClipNo, games, loadingGames} = useContext(rootStoreContext).gameStore;
    useEffect(() => {
        sortGamesByClipNo();
    }, [sortGamesByClipNo()])
    // if(loadingGames || games === null) return <GamesPlaceholder />
   if(true) return <GamesPlaceholder />
    return (
        <div className="sidebar-way main-container sidebar-void">
            {games !== null && games?.data.length}
        </div>
    )
}

export default observer(PopularGames);