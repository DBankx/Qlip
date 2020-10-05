import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import Clip from "./Clip";

const ClipHome = () => {
    const {loadingInitial, loadAllClips, clipsData} = useContext(rootStoreContext).clipStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    
    useEffect(() => {
        showSidebar();
        loadAllClips();
    }, [loadAllClips, showSidebar])
    
    if(loadingInitial) {
        return <Spinner/>
    }
    
    return (
        <div className={"p-d-flex p-flex-wrap sidebar-way main-container sidebar-void"}>
            {clipsData.map((clip: IClip) => (
                <div key={clip.id}>
                <Clip clipData={clip} />
                </div>
            ))}
        </div>
    )
}

export default observer(ClipHome);