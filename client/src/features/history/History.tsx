import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import HistoryClip from "./HistoryClip";

const HistoryPage = () => {
    const {getHistoryClips, groupedHistory, loadingInitial} = useContext(rootStoreContext).clipStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
       getHistoryClips(); 
       showSidebar()
    }, [getHistoryClips, showSidebar]);
    
    if(loadingInitial) return <Spinner />
    
    return (
        <div className="sidebar-way main-container  inner-container sidebar-void">
            <h2 style={{fontWeight: 600}}>Qlip History</h2>
            {groupedHistory.length > 0 ? groupedHistory.map(([date, historyclips]) => (
                <div key={date} style={{marginTop: "2em"}}>
                <h4 style={{fontWeight: 600, color: "#777777", overflow: "hidden", whiteSpace: "nowrap"}}>{date}<span style={{display: "inline-block", width: "100%"}}><hr className="divider"/></span></h4>
                    <div>
                        {historyclips.map((clip) => (
                            <div key={clip.id}>
                                <HistoryClip clip={clip} />
                            </div>
                        ))}
                    </div> 
                </div>
            )) : 
            <div className="spinner" style={{color: "#777777", fontWeight: 600}}>
                you havent watched any qlip :(
            </div>
            }
        </div>
    )
}

export default observer(HistoryPage);