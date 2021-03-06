﻿import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../../../application/layout/Spinner";
import ClipDetails from "./ClipDetails";
import UpNext from "./upNext/UpNext";

const ClipPage: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const rootStore = useContext(rootStoreContext);
    const {clearSidebar} = rootStore.commonStore;
    const {clip, loadingInitial, getClip, getRecommended} = rootStore.clipStore;
    
    useEffect(() => {
        clearSidebar();
        getClip(match.params.id).then(() => getRecommended());
    }, [clearSidebar, getClip, match.params.id, getRecommended])
    
    if(loadingInitial || clip == null) return <Spinner />
    
    return (
        <div className={"normal-container"}>
            <div className="p-grid p-jc-center" style={{width: "100%", margin: "0 0.09em 0 0.08em"}}>
                <div className="p-col-12 p-sm-12 p-md-12 p-lg-7" ><ClipDetails clip={clip} /></div>
                <div className="p-col-12 p-md-12 p-sm-12 p-lg-5 p-xl-4 upNext"><UpNext /></div>
            </div>
        </div>
    )
}

export default observer(ClipPage);