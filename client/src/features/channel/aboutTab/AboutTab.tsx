import React, { Fragment } from "react";
import { IChannel } from "../../../infrastructure/models/channel";
import {observer} from "mobx-react-lite";
import AboutSection from "./AboutSection";
import StatsSection from "./StatsSection";

interface IProps{
    channel: IChannel
}

const AboutTab: React.FC<IProps> = ({channel}) => {
    return(
        <Fragment>
           <div className={"p-grid p-jc-center"}>
               <div className={"p-col-12 p-lg-10 p-md-8"}>
                  <AboutSection channel={channel} /> 
               </div>
               <div className={"p-col-12 p-lg-2 p-md-4"}>
                  <StatsSection channel={channel} /> 
               </div>
           </div> 
        </Fragment>
    )
}

export default observer(AboutTab);