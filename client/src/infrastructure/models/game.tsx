import {IClip} from "./clip";

export interface IGame{
    id: number;
    name: string;
    rating: string;
    slug: string;
    released: string;
    background_image: string;
    playtime: number;
    clips?: IClip[];
}