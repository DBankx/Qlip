import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import {RouteComponentProps} from "react-router-dom";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import {SplitButton} from "primereact/splitbutton";
import SearchClip from "./SearchClip";
import PaginatedSearch from "../PaginatedSearch";

const ClipSearchPage : React.FC<RouteComponentProps<{title: string}>> = ({location}) => {
    const params = new URLSearchParams(location.search)
    const title = params.get("title");
    const {loadingInitial, searchClipByTitle, SearchResponse, changePage, changePageSize, SearchPageNumber, SearchPageSize, sortSearchedClip} = useContext(rootStoreContext).clipStore;
    const sortOptions = [
        {
            label: "Most Popular",
            command: () => sortSearchedClip("VIEWS")
        },
        {
            label: "Date Added (Newest)",
            command: () => sortSearchedClip("NEWEST")
        },
        {
            label: "Data Added (Oldest)",
            command: () => sortSearchedClip("OLDEST")
        }
    ]
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        showSidebar();
        searchClipByTitle(title!);
    }, [title, searchClipByTitle, showSidebar, SearchPageSize, SearchPageNumber])
    
    if (loadingInitial || SearchResponse === null ) return <Spinner />
    return (
        <div>
       <div className={"sidebar-way main-container inner-container sidebar-void wrapper"}>
            <div>
            <h2 style={{fontWeight: "normal"}}>Search results for: <span style={{fontWeight: 600}}>{title}</span></h2>
                <div className={"p-d-flex p-ai-center p-jc-between p-mt-2"}>
                    <SplitButton label={"SORT BY"} model={sortOptions} className={"p-button-sm p-button-secondary"} icon={"pi pi-filter"} />
                    <div>
                        <small style={{color: "#777777"}}>{SearchResponse.totalRecords} result(s) found</small>
                    </div>
                </div>
                <hr className={"divider p-mt-2 p-mb-2"} />
                <small>Page {SearchResponse.pageNumber} of {SearchResponse!.totalPages}</small>
                <div className={"p-mt-2"}>
                    {SearchResponse.data.length > 0 ? SearchResponse.data.map((clip) => (
                        <div key={clip.id}>
                            <SearchClip clip={clip} />
                        </div>
                    )) : <div>
                        <p className={"spinner"}>No results found</p>
                    </div>}
                </div>
            </div>
        </div>
            <div className={"pagination-footer"}>
                <PaginatedSearch data={SearchResponse} pageSize={SearchPageSize} changePage={changePage} changePageSize={changePageSize} />
            </div>
        </div>
    )
}

export default observer(ClipSearchPage);