import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "../../application/layout/Spinner";
import ChannelHeader from "./ChannelHeader";
import ChannelViews from "./ChannelViews";

const Channel: React.FC<RouteComponentProps<{username: string}>> = ({match}) => {
    const {loadChannel, loadingChannel, channel} = useContext(rootStoreContext).channelStore;
    useEffect(() => {
        loadChannel(match.params.username)
    }, [match.params.username, loadChannel])
    
    if(loadingChannel || channel === null) return <Spinner />
    
    return (
        <div className={"sidebar-way main-container sidebar-void"}>
            <div className={"container-in-container"}>
            <ChannelHeader channel={channel}/>
            <ChannelViews channel={channel} />
            </div>
        </div>
        
    )
}

export default observer(Channel);