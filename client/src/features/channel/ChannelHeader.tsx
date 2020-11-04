import React, {useContext, useRef} from "react";
import {IChannel} from "../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton";
import {Menu} from "primereact/menu";
import rootStoreContext from "../../application/stores/rootStore";
import {history} from "../../index";

interface IProps{
    channel: IChannel
}

const ChannelHeader: React.FC<IProps> = ({channel}) => {
    const {subscribing, SubscribeToUser, UnSubscribeToUser} = useContext(rootStoreContext).subscriptionStore;
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    const subscribedStyle = {
        color: "#777777",
        borderColor: "#777777",
        background: "none",
        fontWeight: 600
    }

    const userChannelButtonOptions = [
       {
           label: "Customise channel",
           icon: "pi pi-user-edit",
           command: () => history.push(`/customize/${channel.username}`)
       },
       {
           label: "Manage videos",
           icon: "pi pi-sort"
       }
   ]

    const optionsModel = [
        {
            label: `Report ${channel.username}`,
            icon: "pi pi-times"
        },
        {
            label: "Copy channel link",
            icon: "pi pi-copy"
        }
    ]
    const optionsRef = useRef<any>(null);
    
    return (
      <div className={"p-grid p-ai-center p-jc-between"}>
          <div className={"p-grid p-ai-center"}>
              <img style={{borderRadius: "50%", width: "90px", border: "3px solid #81C784"}} src={channel.gravatarProfileImage} alt={"user-profile"} />
              <div style={{marginLeft: "1em"}}>
                  <span style={{display: "block", marginBottom: "0.2em", fontWeight: 600, fontSize: "1.25em"}}>{channel.username}</span>
                  <span style={{color: "#777777", fontSize: "0.9em"}}>{channel.subsrciberCount} {channel.subsrciberCount > 1 ? "Subscribers" : "Subscriber"}</span>
                  <div className={"hide-bg"}>
                      {!isLoggedIn ? <Button tooltip={"Login to subscribe"} label={"Subscribe"} icon={"pi pi-plus"} className={"p-mt-2"} tooltipOptions={{position: "bottom"}} /> : channel.isUser ? (<SplitButton className={"p-button-outlined p-button-small p-mt-2"} label={"Manage"} icon={"fas fa-edit"} model={userChannelButtonOptions} />):(<Button label={channel.subscribedToUser ? "Subscribed" : "Subscribe" } className={"p-button-sm p-mt-2"} icon={subscribing ? "pi pi-spin pi-spinner" : channel.subscribedToUser ? "pi pi-check" : "pi pi-plus"} style={channel.subscribedToUser? subscribedStyle : {}} onClick={channel.subscribedToUser ? () => UnSubscribeToUser(channel.username) : () => SubscribeToUser(channel.username)} />)}
                  </div>
              </div>
          </div>
          <div className={"p-grid p-ai-center hide-sm channel-triggers"}>
              {!isLoggedIn ? <Button tooltip={"Login to subscribe"} label={"Subscribe"} icon={"pi pi-plus"} tooltipOptions={{position: "bottom"}} /> : channel.isUser ? (<SplitButton className={"p-ml-3 p-button-outlined"} label={"Manage Channel"} icon={"fas fa-edit"} model={userChannelButtonOptions} />) : (<Button label={channel.subscribedToUser ? "Subscribed" : "Subscribe" } className={"p-button-sm"} icon={subscribing ? "pi pi-spin pi-spinner" : channel.subscribedToUser ? "pi pi-check" : "pi pi-plus"} onClick={channel.subscribedToUser ? () => UnSubscribeToUser(channel.username) : () => SubscribeToUser(channel.username)} style={channel.subscribedToUser? subscribedStyle : {}} />)}
              <div className={"p-ml-3"}>
              <Button icon={"pi pi-ellipsis-v"} onClick={(event) => optionsRef.current.toggle(event)} className={"p-button-sm p-button-text"} aria-controls="popup_menu" aria-haspopup/>
              <Menu popup={true} id={"popup_menu"} ref={optionsRef} model={optionsModel} />
          </div>
      </div> 
      </div>
    )
}

export default observer(ChannelHeader);