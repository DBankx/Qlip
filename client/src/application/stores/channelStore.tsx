import { RootStore } from "./rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import { IChannel } from "../../infrastructure/models/channel";
import {ChannelRequest} from "../api/agent";

export class ChannelStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable channel : IChannel | null = null;
    @observable loadingChannel : boolean = false;
    
    
    @action loadChannel = async (username: string) => {
        this.loadingChannel = true;
        try{
            var channel = await ChannelRequest.getChannel(username);
            runInAction(() => {
                this.channel = channel;
                if(this.channel.username === this.rootStore.authStore.user?.username){
                    this.channel.isUser = true;
                } else {
                    this.channel.isUser = false;
                }
                this.loadingChannel = false;
            })
        }catch(error){
            runInAction(() => this.loadingChannel = false);
            throw error;
        }
    }
    
    
}
