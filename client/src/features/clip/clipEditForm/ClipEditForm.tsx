import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import EditForm from "./EditForm";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../../../application/layout/Spinner"; 

const ClipEditForm: React.FC<RouteComponentProps<{id: string}>> = ({match}) => {
    const {clearSidebar} = useContext(rootStoreContext).commonStore;
    const {getClip, loadingInitial, clip} = useContext(rootStoreContext).clipStore;
    useEffect(() => {
        clearSidebar();
        getClip(match.params.id);
    }, [clearSidebar, getClip, match.params.id])
    if(loadingInitial || clip === null) return <Spinner />
    return(
        <div className={"container-wrapper"}>
            <div style={{padding: "1em"}}>
                <span className={"create-title"}>Edit Qlip</span>
                        <EditForm clip={clip} />
            </div>
        </div>
    )
}

export default observer(ClipEditForm);