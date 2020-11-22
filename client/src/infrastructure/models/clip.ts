
export interface IClip{
    id: string;
    url: string;
    thumbnail: string;
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
    isWatched: boolean;
    watchedAt: Date;
}

export interface IPaginatedClipResponse{
    pageNumber: number;
    pageSize: number;
    firstPage: string;
    lastPage: string;
    totalPages: number;
    totalRecords: number;
    nextPage: string;
    previousPage: string;
    data: IClip[]
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
    url?: string;
    gameName?: string;
    title: string;
    description: string;
    thumbnail?: string;
}

export interface IUploadedClipValues{
    publicId: string;
    url: string;
    thumbnail: string;
    duration: number | null,
    format: string | null,
    original_filename: string | null;
    created_at: Date | null;
    frame_rate: number | null;
}