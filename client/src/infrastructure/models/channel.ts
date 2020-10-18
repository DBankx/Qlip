import { IClip } from "./clip";

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
}

export interface IChannelFormValues{
    bio?: string;
    twitter?: string;
    instagram?: string;
    twitch?: string;
    youtube?: string;
}
