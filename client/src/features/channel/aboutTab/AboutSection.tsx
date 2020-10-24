import React, {Fragment} from "react";
import {IChannel} from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import parse from "html-react-parser";

interface IProps{
    channel: IChannel
}

const AboutSection : React.FC<IProps> = ({channel}) => {
    return (
        <Fragment>
            <h3>About {channel.isUser ? "You" : channel.username}</h3>
            <div style={{marginTop: "0.5em", height: "auto"}}>
            <span className={"text-sm"} style={{color: "#777777", fontSize: "0.8em"}}>Bio</span>
                <span style={{fontSize: "0.9em", display: "block", marginTop: "1em"}}>{channel.bio !== null ? parse(channel.bio) : <span>{channel.username} has no bio yet.</span>}</span>
              <div style={{marginTop: "1em"}}>
                  <span style={{marginTop: "1em", fontSize: "0.8em", color: "#777777", display: "block"}}>Social Links</span>
                  <div className={"p-d-flex p-ai-center p-mt-3"}>
                  {channel.twitter && (<a style={{color: "#00ACEE", textDecoration: "none"}} className={"p-mr-3"} href={channel.twitter} rel={"noopener noreferrer"} target={"_blank"}><i className={"pi pi-twitter"} /> Twitter</a>)}
                  {channel.twitch && (<a style={{color: "#6441A5", textDecoration: "none", display: "block"}} className={"p-mr-3"}  href={channel.twitch} rel={"noopener noreferrer"} target={"_blank"}><i className="fab fa-twitch" /> Twitch</a>)}
                  {channel.youtube && (<a style={{color: "#FF0000", textDecoration: "none", display: "block"}} className={"p-mr-3"}  href={channel.youtube} rel={"noopener noreferrer"} target={"_blank"}><i className={"fab fa-youtube"} /> Youtube</a>)}
                  {channel.instagram && (<a style={{color: "#3F729B", textDecoration: "none", display: "block"}} href={channel.instagram} rel={"noopener noreferrer"} target={"_blank"}><i className="fab fa-instagram" /> Instagram</a>)}
                  </div> 
              </div>
            </div>
        </Fragment>
    )
}

export default observer(AboutSection)