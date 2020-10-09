export interface IClip{
    id: string;
    url: string;
    thumbnail?: string;
    createdAt?: Date;
    gameName: string;
    title: string;
    description: string;
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