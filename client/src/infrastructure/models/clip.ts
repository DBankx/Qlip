export interface IClip{
    id: string;
    url: string;
    thumbnail: string;
    createdAt: Date;
    gameName: string;
    title: string;
    description: string;
}

export interface IClipFormValues{
    id: string;
    file: Blob|null;
    gameName: String;
    title: string;
    description: String;
}

export interface IUploadedClipValues{
    publicId: string;
    url: string;
}