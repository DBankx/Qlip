import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import ProfilePicture from "./ProfilePicture"; 
import BioForm from "./BioForm";

const CustomizePage: React.FC = () => {
    const {channel, loadChannel, loadingChannel} = useContext(rootStoreContext).channelStore;
    const {user} = useContext(rootStoreContext).authStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        if(!channel)
            showSidebar();
            loadChannel(user!.username);
    }, [channel, loadChannel, user, showSidebar])
    
    if(loadingChannel || channel === null) return <Spinner />
    
    return (
        <div className={"sidebar-way inner-container main-container sidebar-void"}>
            <Link to={`/channel/${channel.username}`} style={{color: "#777777", fontSize: "0.8em", textDecoration: "none"}}><i className={"fas fa-long-arrow-alt-left"} /> Back to channel</Link>
            <section>
            <p className={"customize-heading"}>Profile Picture</p>
            <ProfilePicture channel={channel} />
            </section>
            <section>
                <div className={"customize-heading"}>
                    <p>Identity Settings</p>
                    <small style={{margin: "1em 0", color: "#777777"}}>Change identifying details for your account</small>
                </div>
                <BioForm channel={channel} />
            </section>
        </div>
    )
}

export default observer(CustomizePage);