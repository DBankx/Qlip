﻿import {createContext} from "react";
import {configure} from "mobx";
import {ClipStore} from "./clipStore";
import {CommonStore} from "./commonStore";
import {AuthStore} from "./authStore";
import {GameStore} from "../../application/stores/gameStore";
import {ChannelStore} from "./channelStore";
import {SubscriptionStore} from "./subscriptionStore";
import {EmailStore} from "./emailStore";
//========================================================================
//============= Store for controlling all stores in the app ================
//========================================================================


// enforce state changes to only be run in actions
configure({enforceActions: "always"});

export class RootStore{
    clipStore: ClipStore;
    commonStore: CommonStore;
    authStore: AuthStore;
    gameStore: GameStore;
    channelStore: ChannelStore;
    subscriptionStore: SubscriptionStore;
    emailStore: EmailStore;
    constructor(){
        this.clipStore = new ClipStore(this);
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.gameStore = new GameStore(this);
        this.channelStore = new ChannelStore(this);
        this.subscriptionStore = new SubscriptionStore(this);
        this.emailStore = new EmailStore(this);
    }
}

// create a context for the root store
const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;