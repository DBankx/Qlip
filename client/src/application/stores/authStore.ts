import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IAuthFormValues, IUser} from "../../infrastructure/models/auth";
import {Auth} from "../api/agent";

//========================================================================
//============= Store for controlling all auth processes in the app ================
//========================================================================


export class AuthStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable user: IUser | null = null;
    
    @computed get isLoggedIn(){
        return !!this.user;
    }
    
    @action loginUser = async (values: IAuthFormValues) => {
        try{
           let user = await Auth.login(values);
           runInAction(() => {
               this.user = user;
           })
            this.rootStore.commonStore.setAppLoaded();
           this.rootStore.commonStore.setToken(user.token);
           window.location.reload();
        }catch(error){
            throw error;
        }
    }
    
    @action registerUser = async (values: IAuthFormValues) => {
        try{
            let user = await Auth.register(values);
            runInAction(() => {
                this.user = user;
            })
            this.rootStore.commonStore.setAppLoaded();
            this.rootStore.commonStore.setToken(user.token);
        }catch(error){
            throw error;
        }
    }
    
    @action logout = () => {
        this.user = null;
        this.rootStore.commonStore.deleteToken();
        window.location.reload();
        this.rootStore.commonStore.showAlert("info", "You have been logged out", "");
    }
    
    @action getCurrentUser = async () => {
        try{
            var user = await Auth.getCurrentUser();
            runInAction(() => this.user = user)
        }catch(error){
            throw error;
        }
    }
}