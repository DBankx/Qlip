import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Paginator} from "primereact/paginator";
import rootStoreContext from "../../application/stores/rootStore";

const GamePaginator = () => {
    const {games, pageSize, changePage, changePageSize} = useContext(rootStoreContext).gameStore;
    const [number, setNumber] = useState(1);
    return (
        <div>
            <Paginator first={number} totalRecords={games?.totalRecords} rowsPerPageOptions={[10, 20, 30]} rows={pageSize} onPageChange={(e) => {
                changePage(e.page + 1);
                setNumber(e.first);
                changePageSize(e.rows);
                
            } }/>
        </div>
    )
}

export default observer(GamePaginator);