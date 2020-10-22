import { RootStore } from "./rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import { IChannel } from "../../infrastructure/models/channel";
import {ChannelRequest} from "../api/agent";
import {IClip} from "../../infrastructure/models/clip";

export class ChannelStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable channel : IChannel | null = null;
    @observable loadingChannel : boolean = false;
    @observable loadingFilter: boolean = false;
    
    
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
   
    @action sortChannelClipsByMostPopular = () => {
        this.loadingFilter = true;
        if(this.channel!.clips.length > 0){
            this.channel!.clips.sort((a: IClip, b: IClip) => {
                return b.views - a.views;
            })
        }
        this.loadingFilter = false;
    }
    
    @action sortChannelClipsByDate = (predicate: string) => {
        this.loadingFilter = true;
        switch(predicate){
            case "NEWEST":
                this.channel!.clips.sort((a: IClip, b:IClip) => {
                    var oldDate = new Date(a.createdAt);
                    var newDate = new Date(b.createdAt);
                    return newDate.getTime() - oldDate.getTime();
                });
                break;
            case "OLDEST":
                this.channel!.clips.sort((a: IClip, b:IClip) => {
                    var oldDate = new Date(a.createdAt);
                    var newDate = new Date(b.createdAt);
                    return oldDate.getTime() - newDate.getTime();
                });
                break;
            default:
                return this.channel!.clips;
        }
            
        this.loadingFilter = false;
    }
    
}
