export interface IClip{
    id: string;
    url: string;
    thumbnail?: string;
    createdAt: Date;
    gameName: string;
    title: string;
    description: string;
    authorName: string;
    authorImage: string;
    views: number;
    likes: number;
    dislikes: number;
    isLiked: boolean;
    isDisliked: boolean;
    authorSubscriberCount: number;
    subscribedToAuthor: boolean;
    isUser: boolean;
    comments: IComment[];
}

export interface IComment{
    username: string;
    id: string;
    gravatarProfileImage: string;
    text: string;
    postedAt: string;
}

export interface IClipFormValues{
    id: string;
    url: string;
    gameName: string;
    title: string;
    description: string;
}

export interface IUploadedClipValues{
    publicId: string;
    url: string;
}