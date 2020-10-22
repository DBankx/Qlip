import {IClip} from "./clip";

export interface IPaginatedGameResponse{
    pageNumber: number;
    pageSize: number;
    firstPage: string;
    lastPage: string;
    totalPages: number;
    totalRecords: number;
    nextPage: string;
    previousPage: string;
    data: IGame[]
}

export interface IGame{
    id: number;
    name: string;
    rating: string;
    slug: string;
    released: string;
    background_Image: string;
    playtime: number;
    clips?: IClip[];
    isLiked?: boolean;
}