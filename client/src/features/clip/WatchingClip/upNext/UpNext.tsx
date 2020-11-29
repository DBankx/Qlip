import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../../application/stores/rootStore";
import UpNextClip from "./UpNextClip";
import {InputSwitch} from "primereact/inputswitch";

const UpNext = () => {
    const {UpNextClips, autoPlay, setAutoPlay} = useContext(rootStoreContext).clipStore;
    return (
        <div>
           <div className={"p-d-flex p-ai-center p-jc-between p-mb-2"}>
               <p>Up next</p>
               <div style={{display: "flex", alignItems: "center"}}>
                   <p style={{fontWeight: 600, color: "#777777", marginRight: "0.3em"}}>AUTOPLAY</p>
                   <InputSwitch checked={autoPlay} onChange={(e) => setAutoPlay(e.value)} /> 
               </div>
           </div>
            {UpNextClips && UpNextClips.data.length > 0 && <UpNextClip clip={UpNextClips.data[0]} />}
            <hr className="divider p-mb-2 p-mt-2" />
            {UpNextClips && UpNextClips.data.length > 1 ? (
                UpNextClips!.data.splice(1).map((clip) => (
                    <div key={clip.id}>
                        <UpNextClip clip={clip} />
                    </div>
                ))
            ) : <p>There are no more recommended qlips</p>}
        </div>
    )
}

export default observer(UpNext);