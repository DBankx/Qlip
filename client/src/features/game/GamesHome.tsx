import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import GameBanner from "./GameBanner";
import GamePaginator from "./GamePaginator";
import { RouteComponentProps } from "react-router-dom";
import {SplitButton} from "primereact/splitbutton";

const GamesHome : React.FC<RouteComponentProps> = ({location}) => {
    const {loadGames, loadingGames, pageSize, pageNumber, games, searchGamesByName} = useContext(rootStoreContext).gameStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    const params = new URLSearchParams(location.search);
    const gameName = params.get("title");
    useEffect(() => {
        showSidebar();
        if(location.pathname === "/search/games"){
            if(gameName){
                searchGamesByName(gameName!);
            } else{
                loadGames();
            }
        }else{
            loadGames();
        }
    }, [loadGames, pageSize, pageNumber, showSidebar, gameName, searchGamesByName])
    
    
    return (
        <div>
            <div className={"sidebar-way main-container sidebar-void"}>
                {loadingGames ? <Spinner /> : (<div>
                    {location.pathname === "/search/games" ? (
                        <div>
                            <h2 style={{fontWeight: "normal"}}>Search results for: <span style={{fontWeight: 600}}>{gameName}</span></h2>
                            <div className={"p-d-flex p-ai-center p-jc-between p-mt-2"}>
                                <div>
                                    <small style={{color: "#777777"}}>{games && games.totalRecords} result(s) found</small>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h3 style={{marginBottom: "1em"}}>All games</h3>
                    )}
                    <div className={"p-grid"}>
                        {games && games.data.map(game => (
                            <div key={game.id} className={"p-col-12 p-md-4 p-lg-3 p-sm-6"}>
                                <GameBanner game={game} />
                            </div>
                        ))}
                    </div> 
                </div>)}
               
            </div>
    <div>
        <GamePaginator />
    </div>
    </div>
    )
}

export default observer(GamesHome);