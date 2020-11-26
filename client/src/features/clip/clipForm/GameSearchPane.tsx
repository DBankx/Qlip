import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";

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
        <div>
            {
                loadingGames ? <Spinner /> : `${games?.data.length}` 
            }
        </div>
    )
}

export default observer(GameSearchPane);