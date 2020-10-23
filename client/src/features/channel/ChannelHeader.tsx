import React, {useRef} from "react";
import {IChannel} from "../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton";
import {Menu} from "primereact/menu";

interface IProps{
    channel: IChannel
}

const ChannelHeader: React.FC<IProps> = ({channel}) => {
    
   const userChannelButtonOptions = [
       {
           label: "Customise channel",
           icon: "pi pi-user-edit"
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
                  <span style={{color: "#777777", fontSize: "0.9em"}}>123k subscribers</span>
                  <div className={"hide-bg"}>
                  <Button label={"subscribe"} icon={"pi pi-user-plus"} className={"p-button-sm show-sm  p-button-text p-button-success"} style={{display: "block", marginTop: "0.2em"}} />
                  </div>
              </div>
          </div>
          <div className={"p-grid p-ai-center hide-sm channel-triggers"}>
              {!channel.isUser && (<Button label={"subscribe"} icon={"pi pi-user-plus"} />)}
              {channel.isUser && (<SplitButton className={"p-ml-3 p-button-outlined"} label={"Manage Channel"} icon={"fas fa-edit"} model={userChannelButtonOptions} />)}
              <div className={"p-ml-3"}>
              <Button icon={"pi pi-ellipsis-v"} onClick={(event) => optionsRef.current.toggle(event)} className={"p-button-sm p-button-text"} aria-controls="popup_menu" aria-haspopup/>
              <Menu popup={true} id={"popup_menu"} ref={optionsRef} model={optionsModel} />
          </div>
      </div> 
      </div>
    )
}

export default observer(ChannelHeader);