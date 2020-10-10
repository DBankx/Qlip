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
    @observable clipUploadHelpVisible: boolean = false;
    @observable token: string | null = null;
    @observable appLoaded: boolean = false;
    @observable.shallow modal : {open: boolean, body: any} = {
        open: false,
        body: null
    }


    @action showClipUploadHelper = () => {
        this.clipUploadHelpVisible = true;
    }
    @action removeClipUploadHelper = () => {
        this.clipUploadHelpVisible = false;
    }
    
    // action to set the sidebar if visible or not
    @action clearSidebar = () => {
        this.sidebarVisible = false;
    }
    
    @action showSidebar = ()=> {
        this.sidebarVisible = true;
    }
    
    @action setToken = (token: string) => {
        this.token = token;
        localStorage.setItem("token", token);
    }
    
    @action deleteToken = () => {
        this.token = null;
        localStorage.removeItem("token");
    }
    
    @action setAppLoaded = () => {
        this.appLoaded = true;
    }
    
    @action openAuthModal = (content: any) => {
        this.modal.open = true;
        this.modal.body = content;
    }
    
    @action closeAuthModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}