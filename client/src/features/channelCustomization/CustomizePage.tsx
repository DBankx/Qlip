import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import rootStoreContext from "../../application/stores/rootStore";
import Spinner from "../../application/layout/Spinner";
import ProfilePicture from "./ProfilePicture"; 
import BioForm from "./BioForm";

const CustomizePage: React.FC<RouteComponentProps<{username: string}>> = ({match}) => {
    const {channel, loadChannel, loadingChannel} = useContext(rootStoreContext).channelStore;
    useEffect(() => {
        if(!channel)
            loadChannel(match.params.username);
    }, [channel, loadChannel, match.params.username])
    
    if(loadingChannel || channel === null) return <Spinner />
    
    return (
        <div className={"sidebar-way inner-container main-container sidebar-void"}>
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