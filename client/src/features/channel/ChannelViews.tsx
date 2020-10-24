import React from "react";
import {observer} from "mobx-react-lite";
import {TabPanel, TabView} from "primereact/tabview";
import ChannelHomeView from "./homeTab/ChannelHomeView";
import { IChannel } from "../../infrastructure/models/channel";
import ClipsTab from "./clipsTab/ClipsTab";
import AboutTab from "./aboutTab/AboutTab";
import LikedClipsTab from "./likedClipsTab/LikedClipsTab";

interface IProps{
    channel: IChannel
}

const ChannelViews: React.FC<IProps> = ({channel}) => {
    return (
        <div style={{marginTop: "1.4em"}}>
       <TabView>
           <TabPanel header={<div><p className={"hide-sm"}>home</p><i className={"pi pi-home hide-bg"}/></div>}>
               <div>
                   <ChannelHomeView channel={channel} />
               </div>
           </TabPanel>
           <TabPanel header={<div><p className={"hide-sm"}>Qlips</p><i className={"pi pi-video hide-bg"}/></div>}>
               <div>
                  <ClipsTab clips={channel.clips} /> 
               </div>
           </TabPanel>
           <TabPanel header={<div><p className={"hide-sm"}>About</p><i className={"pi pi-info hide-bg"}/></div>} >
           <div>
              <AboutTab channel={channel} /> 
           </div>
       </TabPanel>
           <TabPanel header={<div><p className={"hide-sm"}>Liked Clips</p><i className={"pi pi-thumbs-up hide-bg"}/></div>}>
               <div>
                   <LikedClipsTab channel={channel} />
               </div>
           </TabPanel>
           <TabPanel header={<div style={{display: "flex"}}><p className={"hide-sm"}>Channels</p><i className={"pi pi-user-plus hide-bg"}/></div>}>
               <div>
                hey
               </div>
           </TabPanel>
       </TabView>
        </div>
    )
}

export default observer(ChannelViews);