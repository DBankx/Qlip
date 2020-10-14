import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../../../application/layout/Spinner";
import GameHeader from "./GameHeader";

const Game: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {viewGame, loadingGames, game} = useContext(rootStoreContext).gameStore;
    useEffect(() => {
        viewGame(parseInt(match.params.id));
    }, [viewGame, match.params.id])
    
    if (loadingGames || game === null) return <Spinner />
    
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            <GameHeader game={game} />
        </div>
    )
}

export default observer(Game);