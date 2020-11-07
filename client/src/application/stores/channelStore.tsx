import { RootStore } from "./rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IChannel, IChannelFormValues, IChannelPasswordValues} from "../../infrastructure/models/channel";
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
    @observable updating: boolean = false;
    
    
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
    
    
    @action updateUsername = async (values: IChannelFormValues) => {
        if(window.confirm("Are you sure you want to change your username? understand that this action will log you out")){
            try{
                await ChannelRequest.updateChannel(values);
               runInAction(() => {
                 this.rootStore.authStore.logout();  
               }) 
            } catch (error){
                runInAction(() =>  {

                    this.rootStore.commonStore.showAlert("success", "Update", "Account has been updated");

                    this.rootStore.authStore.logout();
                })
                throw error;
            }
        }
    }
    
    @action updateChannel = async (values: IChannelFormValues) => {
        this.updating = true;
        try{
            await ChannelRequest.updateChannel(values);
            runInAction(() => {
                this.rootStore.authStore.user!.username = values.username ? values.username : this.rootStore.authStore.user!.username;
                if(this.channel) {
                    this.channel.twitch = values.twitch ? values.twitch : this.channel.twitch
                    this.channel.bio = values.bio ? values.bio : this.channel.bio
                    this.channel.youtube = values.youtube ? values.youtube : this.channel.youtube
                    this.channel.instagram = values.instagram ? values.instagram : this.channel.instagram
                    this.channel.twitter = values.twitter? values.twitter: this.channel.twitter
                }
                this.updating = false;
            })
        } catch(error){
            runInAction(() =>  {
                this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful");
            })
            throw error;
        }
    }
    
    @action changePassword = async (values: IChannelPasswordValues) => {
        this.updating = true;
        try{
            await ChannelRequest.changePassword(values);
            runInAction(() => {
                this.updating = false;
                this.rootStore.commonStore.showAlert("success", "Password changed", "Your password has been updated!")
            })
        } catch(error) {
            runInAction(() => this.updating = false);
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccesful");
            throw error;
        }
    }
    
}
