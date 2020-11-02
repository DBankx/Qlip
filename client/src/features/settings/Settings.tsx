import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import Account from "./Account";
import ChannelSettings from "./ChannelSettings";

const Settings = () => {
    return (
        <div className={"sidebar-way main-container inner-container sidebar-void"}>
            <section id={"account"}>
                <b>Account</b>
                <Account />
                </section>
            <hr className={"divider p-mt-2 p-mb-4"} />
            <section id={"channel"}>
               <b>Your channel</b>
               <small style={{display: "block", color: "#777777", margin: "1em 0"}}>This is your presense on Qlip.tv, you need this channel to show off your awesome qlips!</small>
                <ChannelSettings />
           </section> 
        </div>
    )
}

export default observer(Settings);