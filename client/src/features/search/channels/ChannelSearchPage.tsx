import React, {useContext, useEffect} from "react";
import { observer } from "mobx-react-lite";
import {RouteComponentProps} from "react-router-dom";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import {SplitButton} from "primereact/splitbutton";
import PaginatedSearch from "../PaginatedSearch";
import ChannelUser from "../../channel/channelsTab/ChannelUser"; 

const ClipSearchPage : React.FC<RouteComponentProps<{title: string}>> = ({location}) => {
    const params = new URLSearchParams(location.search)
    const username = params.get("username");
    const {loadingChannels, searchChannelByUsername, sortChannelBySubscribers, searchResponse, changePage, changePageSize, SearchPageSize} = useContext(rootStoreContext).channelStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        showSidebar();
        searchChannelByUsername(username!);
    }, [username, searchChannelByUsername, showSidebar])

    if (loadingChannels || searchResponse === null ) return <Spinner />
    
    const sortChannelOption = [
        {label : "Subscribers", command: () => sortChannelBySubscribers() }
    ]

    return (
        <div>
            <div className={"sidebar-way main-container inner-container sidebar-void wrapper"}>
                <div>
                    <h2 style={{fontWeight: "normal"}}>Channel results for: <span style={{fontWeight: 600}}>{username}</span></h2>
                    <div className={"p-d-flex p-ai-center p-jc-between p-mt-2"}>
                        <SplitButton model={sortChannelOption} label={"SORT BY"} className={"p-button-sm p-button-secondary"} icon={"pi pi-filter"} />
                        <div>
                            <small style={{color: "#777777"}}>{searchResponse.totalRecords} result(s) found</small>
                        </div>
                    </div>
                    <hr className={"divider p-mt-2 p-mb-2"} />
                    <small>Page {searchResponse.pageNumber} of {searchResponse.totalPages}</small>
                    <div className={"p-mt-3 p-grid p-ai-center"}>
                        {searchResponse.data.length > 0 ? searchResponse.data.map((channelUser) => (
                            <div key={channelUser.username} className={"p-col-6 p-sm-4 p-lg-2 p-md-3"}>
                                <ChannelUser channelUser={channelUser} />
                            </div>
                        )) : <div>
                            <p className={"spinner"}>No results found</p>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={"pagination-footer"}>
                <PaginatedSearch data={searchResponse} pageSize={SearchPageSize} changePage={changePage} changePageSize={changePageSize} />
            </div>
        </div>
    )
}

export default observer(ClipSearchPage);
