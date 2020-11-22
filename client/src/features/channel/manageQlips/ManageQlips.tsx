import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import {history} from "../../../index";
import { Link } from "react-router-dom";
import ChannelClip from "../ChannelClip";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton";
import {useMediaQuery} from "react-responsive";

const ManageQlips = () => {
    const {user} = useContext(rootStoreContext).authStore;
    const {loadingFilter, sortChannelClipsByMostPopular, sortChannelClipsByDate} = useContext(rootStoreContext).channelStore;
    const {channel, loadChannel, loadingChannel} = useContext(rootStoreContext).channelStore;
    const isMobile = useMediaQuery({query: "(max-width: 400px)"});
    useEffect(() => {
        if(channel === null){
            loadChannel(user!.username)
        }
    }, [user, channel, loadChannel])

    const sortingOptionsModel= [
        {
            label: "Most Popular",
            command: () => sortChannelClipsByMostPopular()
        },
        {
            label: "Date Added (Oldest)",
            command: () => sortChannelClipsByDate("OLDEST")
        },
        {
            label: "Date Added (Newest)",
            command: () => sortChannelClipsByDate("NEWEST")
        }
    ]
    
    if(loadingChannel || channel === null) return <Spinner />
    
    return (
        <div className={"sidebar-way main-container sidebar-void"} >
            <small ><Link style={{color: "#777777", textDecoration: "none"}} to={`/channel/${user!.username}`}><i className={"fas fa-long-arrow-alt-left"}/> View channel</Link></small>
            <div className={"p-mt-4"}>
                <h2>Manage your qlips</h2>
                <hr className={"divider p-mt-3 p-mb-3"} />
                <div className={isMobile ? "p-d-flex p-jc-between p-ai-center" : "p-d-flex p-ai-center"}>
                    <p style={{color: "#777777"}}>All qlips</p>
                    <SplitButton label={"SORT BY"} icon={"pi pi-filter"} model={sortingOptionsModel} style={isMobile ? {} : {marginLeft: "1em"}} className={"p-button-sm p-button-secondary"} />
                </div>
                <div className={"p-grid p-ai-center"}>
                    {channel.clips.length > 0 ? channel.clips.map((clip) => (
                        <div key={clip.id} className={"p-col-12 p-lg-3 p-md-5 p-sm-6"}>
                           <div>
                               <ChannelClip clip={clip} />
                              <div>
                                  <Button icon={"pi pi-trash"} className={"p-button-text"} tooltip={"Delete qlip"} tooltipOptions={{position: "bottom"}} />
                                  <Button icon={"pi pi-pencil"} onClick={() => history.push(`/manage/${clip.id}`)} label={"EDIT"} className={"p-button-text"} style={{fontWeight: 600}} />
                              </div> 
                           </div> 
                        </div>
                    )) : (
                        <div className="p-text-center" style={{margin: "4em auto", fontWeight: 600, color: "#777777"}}>
                            <div>
                                <p>You havent uploaded any qlip :(</p>
                                <Button label="Add a Qlip" onClick={() => history.push("/create")} className="p-button-outlined p-button-sm p-mt-3" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default observer(ManageQlips);