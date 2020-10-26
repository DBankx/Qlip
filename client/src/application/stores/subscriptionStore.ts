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
    @observable subscribingTarget: string = "";
    @observable subscribingToChannel: boolean = false;
    
    @action SubscribeToUser = async (username: string) => {
        this.subscribing = true;
        try{
            await SubscriptionRequest.subscribeToUser(username);
            runInAction(() => {
                if(this.rootStore.clipStore.clip !== null){
                    this.rootStore.clipStore.clip.subscribedToAuthor = true;
                    this.rootStore.clipStore.clip.authorSubscriberCount++;
                }
                if(this.follows != null){
                    // get the user you are following from the array by filtering
                    var channelUser = this.follows.find((channelUser) => channelUser.username === username);
                    if(channelUser) {
                        channelUser.subscriberCount++;
                        channelUser.subscribedToChannel = true;
                    }
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
                    if(this.follows != null){
                        // get the user you are following from the array by filtering
                        var channelUser = this.follows.find((channelUser) => channelUser.username === username);
                        if(channelUser) {
                            channelUser.subscriberCount--;
                            channelUser.subscribedToChannel = false;
                        }
                    }
                    
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
    
    @action subscriptionToChannelFollow = async (username: string, predicate: string) => {
        this.subscribingTarget = username;
        this.subscribingToChannel = true;
        try{
            switch(predicate){
                case "subscribing":
                   await SubscriptionRequest.subscribeToUser(username);
                   runInAction(() => {
                    if(this.follows != null){
                        // get the user you are following from the array by filtering
                        var channelUser = this.follows.find((channelUser) => channelUser.username === username);
                        if(channelUser) {
                            channelUser.subscriberCount++;
                            channelUser.subscribedToChannel = true;
                        }
                    }
                    this.subscribingToChannel = false;
                    toast.info(`You have subscribed to ${username}`)
                   });
                   break;
                case "unsubscribing":
                    await SubscriptionRequest.unSubscribe(username);
                    runInAction(() => {
                        if(this.follows != null){
                            // get the user you are following from the array by filtering
                            var channelUser = this.follows.find((channelUser) => channelUser.username === username);
                           if(this.rootStore.channelStore.channel!.isUser){
                               this.follows = this.follows.filter((channelUsera) => channelUsera !== channelUser);
                           } 
                            if(channelUser) {                                 
                                channelUser.subscriberCount--;
                                channelUser.subscribedToChannel = false;
                            }
                        }
                        this.subscribingToChannel = false;
                        toast.info(`You have unsubscribed to ${username}`);
                    });
                    break; 
            }
        } catch(error){
            runInAction(() => this.subscribingToChannel = false);
            toast.error(`Error occured while ${predicate} ${username}`);
            throw error;
        }
    }
}