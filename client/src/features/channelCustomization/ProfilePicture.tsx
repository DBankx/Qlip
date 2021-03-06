﻿import React from "react";
import {observer} from "mobx-react-lite";
import {IChannel} from "../../infrastructure/models/channel";
import {Card} from "primereact/card";

interface IProps{
    channel: IChannel
}

const ProfilePicture : React.FC<IProps> = ({channel}) => {
    return (
        <Card className={"card-border"}>
            <div className={"p-d-flex p-ai-center"}>
                <img src={channel.gravatarProfileImage} alt={"avatar"} style={{borderRadius: "50%", width: "80px", marginRight: "1em"}} />
                <div>
                    <a href="https://en.gravatar.com/support/activating-your-account/" target="_blank" rel="noopener noreferrer" style={{fontWeight: 600}}  >Change profile picture</a>
                    <p style={{color: "#777777", marginTop: "0.5em", lineHeight: "1.5"}}>Change your profile picture using gravatar.</p>
                </div>
            </div>
        </Card>
    )
}

export default observer(ProfilePicture);