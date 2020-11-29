import {RootStore} from "./rootStore";
import {action, makeObservable, observable, reaction} from "mobx";


//========================================================================
//============= Store for common normal states in the app ================
//========================================================================


export class CommonStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);

        // reaction to the token change in state
        reaction(() => this.token, (token) => {
            if (token) {
                localStorage.setItem("token", token);
            } else {
                localStorage.removeItem("token")
            }
        })
    }

    @observable sidebarVisible: boolean = true;
    @observable clipUploadHelpVisible: boolean = false;
    @observable token: string | null = localStorage.getItem("token");
    @observable appLoaded: boolean = false;
    @observable.shallow modal: { open: boolean, body: any} = {
        open: false,
        body: null,
    }
    @observable.shallow alertOptions : {severity: any, summary: string, detail: string, life: number} = {
        severity: undefined,
        summary: "",
        detail: "",
        life: 3000
    };
    
    @observable showAlertRegister : boolean = true;
    @observable alertVisible: boolean = false;

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

    @action showSidebar = () => {
        this.sidebarVisible = true;
    }

    @action setToken = (token: string) => {
        this.token = token;
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

    @action removeAlert = () => {
        this.alertVisible = false;
        this.alertOptions.detail = "";
        this.alertOptions.summary = "";
        this.alertOptions.severity = undefined;
    }
    
    @action showAlert = (severity: string, summary: string, detail: string) => {
        this.alertOptions.detail = detail;
        this.alertOptions.summary = summary;
        this.alertOptions.severity = severity;
        this.alertVisible = true;
        setTimeout(() => {
            this.removeAlert();
        }, 3000)
    }
   
    @action removeAlertRegister = () => {
        this.showAlertRegister = false;
    }
   
}

