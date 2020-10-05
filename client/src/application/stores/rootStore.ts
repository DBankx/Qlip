import {createContext} from "react";
import {configure} from "mobx";
import {ClipStore} from "./clipStore";
import {CommonStore} from "./commonStore";
import {ClipPlayerStore} from "./clipPlayerStore";

//========================================================================
//============= Store for controlling all stores in the app ================
//========================================================================


// enforce state changes to only be run in actions
configure({enforceActions: "always"});

export class RootStore{
    clipStore: ClipStore;
    commonStore: CommonStore;
    clipPlayerStore: ClipPlayerStore
    constructor(){
        this.clipStore = new ClipStore(this);
        this.commonStore = new CommonStore(this);
        this.clipPlayerStore = new ClipPlayerStore(this);
    }
}

// create a context for the root store
const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;