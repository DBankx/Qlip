import {RootStore} from "./rootStore";
import {action, makeObservable, observable} from "mobx";


//========================================================================
//============= Store for common normal states in the app ================
//========================================================================


export class CommonStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable sidebarVisible: boolean = true;
    
    
    
    // action to set the sidebar if visible or not
    @action clearSidebar = () => {
        this.sidebarVisible = false;
    }
    
    @action showSidebar = ()=> {
        this.sidebarVisible = true;
    }
    
}