import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import {IClip} from "../../../infrastructure/models/clip";
import Clip from "./Clip";
import ClipHomePlaceholder from "./ClipHomePlaceholder";

const ClipHome = () => {
    const {loadingInitial, loadAllClips, clipsData, watchedQlips, notWatchedQlips} = useContext(rootStoreContext).clipStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    
    useEffect(() => {
        showSidebar();
        loadAllClips();
    }, [loadAllClips, showSidebar])
    
    if(loadingInitial) {
        return <ClipHomePlaceholder />;
    }
    
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            {!isLoggedIn ? (
                <div>
                <h4 style={{fontWeight: 600, color: "#777777", overflow: "hidden", whiteSpace: "nowrap", marginBottom: "1em"}} >All Qlips<span style={{display: "inline-block", width: "100%"}}><hr className="divider" style={{width: "100%"}} /></span></h4>
                <div className={"p-grid home-clip"}>
                    {clipsData.map((clip: IClip) => (
                        <div className={"clip-box p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6"}  key={clip.id}>
                            <Clip clipData={clip} />
                        </div>
                    ))}
                </div>
                </div>
                    ) : (
                        <div>
                            <div style={{position: "relative"}}>
                <h4 style={{fontWeight: 600, color: "#777777", overflow: "hidden", whiteSpace: "nowrap", marginBottom: "1em"}} >New Qlips<span style={{display: "inline-block", width: "100%"}}><hr className="divider" style={{width: "100%"}} /></span></h4>
                                <div className={"p-grid home-clip"} style={{position: "relative"}}>
                                    {notWatchedQlips.length > 0 ? notWatchedQlips.map((clip: IClip) => (
                                        <div className={"clip-box p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6"}  key={clip.id}>
                                            <Clip clipData={clip} />
                                        </div>
                                    )) : 
                                        <div className="p-text-center" style={{margin: "2em auto", fontWeight: 600, color: "#777777"}}>
                                            <div>
                                        <i className="fas fa-video-slash fa-4x"/>
                                        <p>There are no new qlips :(</p>
                                            </div>
                                    </div>
                                    }
                                </div>
                            </div>
                            <div>
                                <h4 style={{fontWeight: 600, color: "#777777", overflow: "hidden", whiteSpace: "nowrap", marginBottom: "1em"}} >Watched<span style={{display: "inline-block", width: "100%"}}><hr className="divider" style={{width: "100%"}} /></span></h4>
                                <div className={"p-grid home-clip"}>
                                    {watchedQlips.length > 0 ? watchedQlips.map((clip: IClip) => (
                                        <div className={"clip-box p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6"}  key={clip.id}>
                                            <Clip clipData={clip} />
                                        </div>
                                    )) :
                                        <div className="p-text-center" style={{margin: "2em auto", fontWeight: 600, color: "#777777"}}>
                                            <div>
                                                <i className="fas fa-video-slash fa-4x"/>
                                                <p>You have not watched any qlips :(</p>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
           </div>
            )}
        </div>
    )
}

export default observer(ClipHome);