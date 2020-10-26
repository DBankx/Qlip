import { RootStore } from "./rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import { toast } from "react-toastify";
import {SubscriptionRequest} from "../api/agent";
import {IChannelUser} from "../../infrastructure/models/channel";

export class SubscriptionStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable subscribing: boolean = false;
    @observable loadingSubscriptions : boolean = false;
    @observable follows: IChannelUser[] | null = null;
    
    @action SubscribeToUser = async (username: string) => {
        this.subscribing = true;
        try{
            await SubscriptionRequest.subscribeToUser(username);
            runInAction(() => {
                if(this.rootStore.clipStore.clip !== null){
                    this.rootStore.clipStore.clip.subscribedToAuthor = true;
                    this.rootStore.clipStore.clip.authorSubscriberCount++;
                }
                if(this.rootStore.channelStore.channel != null){
                    this.rootStore.channelStore.channel.subscribedToUser = true;
                    this.rootStore.channelStore.channel.subsrciberCount++;
                }
                this.subscribing = false;
                toast.info(`You have subscribed to ${username}`)
            })
        }catch(error){
            runInAction(() => this.subscribing = false);
            toast.error(error.data.errors.following);
            throw error;
        }
    }

    @action UnSubscribeToUser = async (username: string) => {
        this.subscribing = true;
        try{
            await SubscriptionRequest.unSubscribe(username);
            runInAction(() => {
                if(this.rootStore.clipStore.clip !== null){
                    this.rootStore.clipStore.clip.subscribedToAuthor = false;
                    this.rootStore.clipStore.clip.authorSubscriberCount--;
                    
                }
                if(this.rootStore.channelStore.channel != null){
                    this.rootStore.channelStore.channel.subscribedToUser = false;
                    this.rootStore.channelStore.channel.subsrciberCount--;
                }
                this.subscribing = false;
                toast.info(`You have unsubscribed to ${username}`);
            })
        }catch(error){
            runInAction(() => this.subscribing = false);
            toast.error(error.data.errors.following);
            throw error;
        }
    }
   
    @action getFollows = async (username: string, predicate: string) => {
        this.loadingSubscriptions = true;
        try{
            var follows = await SubscriptionRequest.getFollows(username, predicate);
            runInAction(() => {
               this.follows = follows; 
                this.loadingSubscriptions = false;
            })
        }catch(error){
            runInAction(() => this.loadingSubscriptions = false);
            toast.error("Error occurred");
            throw error;
        }
    }
}