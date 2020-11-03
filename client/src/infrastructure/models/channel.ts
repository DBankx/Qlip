import { IClip } from "./clip";
import {IGame} from "./game";

export interface IChannel{
    gravatarProfileImage: string;
    createdAt: string;
    bio: string;
    instagram: string;
    youtube: string;
    twitch: string;
    twitter: string;
    clips: IClip[];
    username: string;
    overallViews: number;
    isUser: boolean;
    likedGames: IGame[];
    likedClips: IClip[];
    subsrciberCount: number;
    subscribedToUser: boolean;
}

export interface IChannelUser{
    gravatarProfileImage: string;
    subscriberCount: number;
    username: string;
    subscribedToChannel: boolean;
}

export interface IChannelFormValues{
    bio?: string;
    twitter?: string;
    instagram?: string;
    twitch?: string;
    youtube?: string;
    username? : string;
}
