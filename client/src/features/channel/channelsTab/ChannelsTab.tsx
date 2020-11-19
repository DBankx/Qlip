import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {IChannel} from "../../../infrastructure/models/channel";
import { Fragment } from "react";
import ChannelUser from "./ChannelUser";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";

interface IProps{
    channel: IChannel
}

const ChannelsTab : React.FC<IProps> = ({channel}) => {
    const {loadingSubscriptions, getFollows, follows} = useContext(rootStoreContext).subscriptionStore;
    useEffect(() => {
        getFollows(channel.username, "following");
    }, [channel.username, getFollows]);
    if(loadingSubscriptions && follows === null) return <Spinner />
    return (
        <Fragment>
            <span>Subscriptions</span>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <div className={"p-grid p-ai-center"}>
                {follows && follows.length > 0 ? follows!.map((user) => (
                    <div key={user.username} className={"p-col-6 p-sm-4 p-lg-2 p-md-3"}>
                        <ChannelUser channelUser={user} channel={channel} />
                    </div>
                )) : <span>{channel.isUser ? "You" : channel.username} {channel.isUser ? "have" : "has"} no subscriptions</span>}
            </div>
        </Fragment>
    )
}

export default observer(ChannelsTab);