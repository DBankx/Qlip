import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../../application/stores/rootStore";
import {toJS} from "mobx";
import SearchClip from "../../../search/clips/SearchClip";
import UpNextClip from "./UpNextClip";
import {InputSwitch} from "primereact/inputswitch";

const UpNext = () => {
    const {watchedClips, UpNextClips, autoPlay, setAutoPlay} = useContext(rootStoreContext).clipStore;
    return (
        <div>
           <div className={"p-d-flex p-ai-center p-jc-between p-mb-2"}>
               <p>Up next</p>
               <div style={{display: "flex", alignItems: "center"}}>
                   <p style={{fontWeight: 600, color: "#777777", marginRight: "0.3em"}}>AUTOPLAY</p>
                   <InputSwitch style={{height: "20px"}} checked={autoPlay} onChange={(e) => setAutoPlay(e.value)} /> 
               </div>
           </div>
            {UpNextClips.length > 0 && <UpNextClip clip={UpNextClips[0]} />}
            <hr className="divider p-mb-2 p-mt-2" />
            {UpNextClips.length > 1 ? (
                UpNextClips.splice(1).map((clip) => (
                    <div key={clip.id}>
                        <UpNextClip clip={clip} />
                    </div>
                ))
            ) : <p>There are no more recommended qlips</p>}
        </div>
    )
}

export default observer(UpNext);