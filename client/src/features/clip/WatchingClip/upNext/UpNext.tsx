import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../../application/stores/rootStore";
import {toJS} from "mobx";
import SearchClip from "../../../search/clips/SearchClip";
import UpNextClip from "./UpNextClip";

const UpNext = () => {
    const {watchedClips, UpNextClips} = useContext(rootStoreContext).clipStore;
    console.log(toJS(UpNextClips));
    return (
        <div>
           <div className={"p-d-flex p-ai-center p-jc-between p-mb-2"}>
               <p>Up next</p>
               <div>
                   <p style={{fontWeight: 600, color: "#777777"}}>AUTOPLAY</p>
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