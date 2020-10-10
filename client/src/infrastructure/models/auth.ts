export interface IAuthFormValues {
    email: string;
    password: string;
    username?: string;
    gender?: string;
    
}

export interface IUser{
    username: string;
    token: string;
    gravatarProfileImage: string;
}