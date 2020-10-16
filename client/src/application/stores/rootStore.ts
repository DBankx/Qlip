import {createContext} from "react";
import {configure} from "mobx";
import {ClipStore} from "./clipStore";
import {CommonStore} from "./commonStore";
import {AuthStore} from "./authStore";
import {GameStore} from "../../application/stores/gameStore";

//========================================================================
//============= Store for controlling all stores in the app ================
//========================================================================


// enforce state changes to only be run in actions
configure({enforceActions: "always"});

export class RootStore{
    clipStore: ClipStore;
    commonStore: CommonStore;
    authStore: AuthStore
    gameStore: GameStore
    constructor(){
        this.clipStore = new ClipStore(this);
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.gameStore = new GameStore(this);
    }
}

// create a context for the root store
const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;