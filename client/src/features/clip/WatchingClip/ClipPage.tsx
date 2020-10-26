import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../../../application/layout/Spinner";
import ClipDetails from "./ClipDetails";
import CommentSection from "./CommentSection";

const ClipPage: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const rootStore = useContext(rootStoreContext);
    const {clearSidebar} = rootStore.commonStore;
    const {clip, loadingInitial, getClip} = rootStore.clipStore;
    
    useEffect(() => {
        clearSidebar();
        getClip(match.params.id);
    }, [clearSidebar, getClip, match.params.id])
    
    if(loadingInitial || clip == null) return <Spinner />
    
    return (
        <div className={"normal-container"}>
            <div className="p-grid" style={{width: "100%", margin: "0 0.09em 0 0.08em"}}>
                <div className="p-col-12 p-sm-12 p-md-12 p-lg-7" ><ClipDetails clip={clip} /></div>
                <div className="p-col-12 p-md-12 p-sm-12 p-lg-5">This is for up next section</div>
            </div>
        </div>
    )
}

export default observer(ClipPage);