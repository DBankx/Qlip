import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Paginator} from "primereact/paginator";

interface IProps{
    data: any,
    pageSize: number,
    changePage: (num: number) => void,
    changePageSize: (num: number) => void;
}

const PaginatedSearch : React.FC<IProps> = ({data, pageSize, changePage, changePageSize}) => {
    const [number, setNumber] = useState(1);
    return (
        <div>
            <Paginator first={number} totalRecords={data.totalRecords} rowsPerPageOptions={[10, 20, 30]} rows={pageSize} onPageChange={(e) => {
                changePage(e.page + 1);
                setNumber(e.first);
                changePageSize(e.rows);
            } }/>
        </div>
    )
}

export default observer(PaginatedSearch);