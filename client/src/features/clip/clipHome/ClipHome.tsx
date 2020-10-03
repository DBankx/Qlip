import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import {observer} from "mobx-react-lite";

const ClipHome = () => {
    const {loadingInitial, loadAllClips, clipsData} = useContext(rootStoreContext).clipStore;
    
    useEffect(() => {
        loadAllClips();
    }, [loadAllClips])
    
    if(clipsData.length < 1) {
        return <Spinner/>
    }
    
    return (
        <div className={"sidebar-contained sidebar-nullified"}>
            clip home is here
        </div>
    )
}

export default observer(ClipHome);