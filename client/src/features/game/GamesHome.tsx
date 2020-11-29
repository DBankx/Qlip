import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import GameBanner from "./GameBanner";
import { RouteComponentProps } from "react-router-dom";
import GamesPlaceholder from "./GamesPlaceholder";
import PaginatedSearch from "../search/PaginatedSearch";
import {SplitButton} from "primereact/splitbutton";

const GamesHome : React.FC<RouteComponentProps> = ({location}) => {
    const {loadGames, loadingGames, pageSize, pageNumber, games, searchGamesByName, changePage, changePageSize, sortGames} = useContext(rootStoreContext).gameStore;
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
    const sortOptions = [
        {
            label: "Ratings",
            command: () => sortGames("RATING")
        },
        {
            label: "Date released (Newest)",
            command: () => sortGames("DATE")
        },
        {
            label: "Playtime",
            command: () => sortGames("PLAYTIME")
        }
    ]
    return (
        <div>
            <div className={"sidebar-way main-container sidebar-void"}>
                <div>
                    {location.pathname === "/search/games" ? (
                        <div style={{marginBottom: "1em"}}>
                            <h2 style={{fontWeight: "normal"}}>Search results for: <span style={{fontWeight: 600}}>{gameName}</span></h2>
                            <div className={"p-d-flex p-ai-center p-jc-between p-mt-2"}>
                                <div>
                                    <small style={{color: "#777777"}}>{games && games.totalRecords} result(s) found</small>
                                </div>
                                <div>
                                    <SplitButton label="SORT BY" icon="pi pi-filter" model={sortOptions} className={"p-button-sm p-button-secondary"} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 style={{marginBottom: "1em"}}>All games</h3>
                            <div className={"p-d-flex p-ai-center p-jc-between p-mt-2"}>
                                <div>
                                    <SplitButton label="SORT BY" icon="pi pi-filter" model={sortOptions} className={"p-button-sm p-button-secondary"} />
                                </div>
                            </div>
                        </div>
                    )}
                    {loadingGames ? <GamesPlaceholder /> : 
                        ( <div className={"p-grid"}>
                            {games && games.data.map(game => (
                                <div key={game.id} className={"p-col-12 p-md-4 p-lg-3 p-sm-6"}>
                                    <GameBanner game={game} />
                                </div>
                            ))}
                        </div>
                    )}
                   </div>
            </div>
    <div>
        <PaginatedSearch data={games !== null && games} pageSize={pageSize} changePage={changePage} changePageSize={changePageSize} />
    </div>
    </div>
    )
}

export default observer(GamesHome);