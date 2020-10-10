import {createContext} from "react";
import {configure} from "mobx";
import {ClipStore} from "./clipStore";
import {CommonStore} from "./commonStore";
import {ClipPlayerStore} from "./clipPlayerStore";
import {AuthStore} from "./authStore";

//========================================================================
//============= Store for controlling all stores in the app ================
//========================================================================


// enforce state changes to only be run in actions
configure({enforceActions: "always"});

export class RootStore{
    clipStore: ClipStore;
    commonStore: CommonStore;
    clipPlayerStore: ClipPlayerStore
    authStore: AuthStore
    constructor(){
        this.clipStore = new ClipStore(this);
        this.commonStore = new CommonStore(this);
        this.clipPlayerStore = new ClipPlayerStore(this);
        this.authStore = new AuthStore(this);
    }
}

// create a context for the root store
const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;