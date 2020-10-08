import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import ClipForm from "./ClipForm";
import SelectedClipPreview from "./SelectedClipPreview";

const CreateClip = () => {
    const rootStore = useContext(rootStoreContext);
    const {clearSidebar} = rootStore.commonStore;
    useEffect(() => {
        clearSidebar();
    }, [clearSidebar])
    return(
        <div className={"container-wrapper"}>
            <div style={{padding: "1em"}}>
                <span className={"create-title"}>Qlip details</span>
            <div className={"p-grid"}>
                <div className={"p-col-12 p-lg-8"}>
                    <ClipForm />
                </div>
                
                <div className={"p-col-12 p-lg-4"}>
                    <SelectedClipPreview />
                </div>
            </div>
            </div>
        </div>
    )
}

export default observer(CreateClip)