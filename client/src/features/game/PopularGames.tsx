import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import GamesPlaceholder from "./GamesPlaceholder";
import GameBanner from "./GameBanner";
import { RouteComponentProps } from "react-router-dom";
import PaginatedSearch from "../search/PaginatedSearch";

const PopularGames : React.FC<RouteComponentProps> = ({location}) => {
    const {sortGamesByClipNo, games, loadingGames, pageSizePopular, pageNumberPopular, changePagePopular, changePageSizePopular} = useContext(rootStoreContext).gameStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        showSidebar();
        sortGamesByClipNo();
    }, [sortGamesByClipNo, pageSizePopular, pageNumberPopular, showSidebar])
   
    return (
        <div>
        <div className="sidebar-way main-container sidebar-void">
            <h2>Popular games on Qlip</h2>
            {loadingGames ? <GamesPlaceholder /> : (<div style={{marginTop: "1em"}} className="p-grid">
                {games && games?.data.map((game) => (
                    <div key={game.id} className="p-col-12 p-md-4 p-lg-3 p-sm-6">
                        <GameBanner game={game} />
                    </div>
                ))}
            </div>)}
            
        </div>
            
            <div>
                <PaginatedSearch changePageSize={changePageSizePopular} changePage={changePagePopular} data={games !== null && games} pageSize={pageSizePopular}  />
            </div>
            
        </div>
    )
}

export default observer(PopularGames);