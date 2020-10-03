import {createContext} from "react";
import {configure} from "mobx";
import {ClipStore} from "./clipStore";

// enforce state changes to only be run in actions
configure({enforceActions: "always"});

export class RootStore{
    clipStore: ClipStore;
    constructor(){
        this.clipStore = new ClipStore(this);
    }
}

// create a context for the root store
const rootStoreContext = createContext(new RootStore());

export default rootStoreContext;