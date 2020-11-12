import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IClip, IClipFormValues, IPaginatedClipResponse, IUploadedClipValues} from "../../infrastructure/models/clip";
import {IAuthFormValues, IUser} from "../../infrastructure/models/auth";
import {history} from "../../index";
import {IGame, IPaginatedGameResponse} from "../../infrastructure/models/game";
import {IChannelUser, IChannel, IChannelFormValues, IChannelPasswordValues, IPaginatedChannelResponse} from "../../infrastructure/models/channel";

// setting the default url
axios.defaults.baseURL = "http://localhost:5000/api";

// setting up axios interceptors
axios.interceptors.request.use((config: AxiosRequestConfig) => {
    var token = localStorage.getItem("token");
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
})

export const alertOptionsfunc = {
    severity: undefined,
    summary: "",
    detail: ""
}

function setAlert(severity: any, summary: string, detail: string){
    alertOptionsfunc.severity = severity;
        alertOptionsfunc.summary = summary;
        alertOptionsfunc.detail = detail;
}

axios.interceptors.response.use(undefined, (error) => {
    //checks for network error by checking the message and if there is no response object
    if (error.message === 'Network Error' && !error.response) {
        setAlert("error", "Network error", "Check your connection");
    }
    //redirect to notfound page for bad guids
    if (error.response.status === 404) {
        history.push('/notfound');
    }
    //redirect to notfound page for invalid id guid
    if (
        error.response.status === 400 &&
        error.response.config.method === 'get' &&
        error.response.data.errors.hasOwnProperty('id')
    ) {
        history.push('/notfound');
    }
    //send a toast notification if any response is a 500 status code
    if (error.response.status === 500) {
        // r.commonStore.showAlert("error", "Server error", "Try reloading the page");
        setAlert("error", "Server error", "Try refreshing the page");
    }
    throw error.response; 
})


// the axios response body
const ResponseBody = (response: AxiosResponse) => response.data;

// ========= for development purposes only =============
// slow down the api
const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => {
            resolve(response);
        }, ms)
    );

// creating the template requests
const Requests = {
    get: (url: string, config? : {}) => axios.get(url, config).then(sleep(1000)).then(ResponseBody),
    post:(url: string, body?: {}, config? :{} ) => axios.post(url, body, config).then(sleep(1000)).then(ResponseBody),
    delete:(url: string) => axios.delete(url).then(sleep(1000)).then(ResponseBody),
    put:(url: string, body?:{}, config?:{}) => axios.put(url, body, config).then(sleep(1000)).then(ResponseBody),
    uploadVideo: (url: string, file: Blob, onUploadProgress: ((progressEvent: ProgressEvent<EventTarget>) => void)) => {
        let formData: FormData = new FormData();
        formData.append("VideoFile", file);
       return axios.post(url, formData, {headers:{"Content-type": "multipart/form-data"}, onUploadProgress: onUploadProgress}).then(ResponseBody)
    }
}


// requests for clips
export const ClipRequest = {
    getAllClips: (): Promise<IClip[]> => Requests.get("/clip"),
    getClip: (id: string) : Promise<IClip> => Requests.get(`/clip/${id}`),
    uploadClip: (clip: Blob, uploadProgress: any): Promise<IUploadedClipValues> => Requests.uploadVideo("/clip/upload", clip, uploadProgress),
    deleteUploadedClip: (id: string) :Promise<{}> => Requests.delete(`/clip/delete/${id}`),
    createClip: (clip: IClipFormValues) : Promise<IClip> => Requests.post("/clip", clip),
    deleteClip: (id: string) : Promise<{}> => Requests.delete(`/clip/${id}`),
    likeClip: (clipId: string): Promise<{}> => Requests.post(`clip/like/${clipId}`),
    dislikeClip: (clipId: string): Promise<{}> => Requests.post(`clip/dislike/${clipId}`),
    updateClip: (clip: IClipFormValues): Promise<IClip> => Requests.put(`clip/${clip.id}`, clip),
    deleteComment: (commentId: string): Promise<{}> => Requests.delete(`clip/comment/${commentId}`)
}

// Auth requests
export const Auth = {
    register: (values: IAuthFormValues) : Promise<IUser> => Requests.post("/user/register", values),
    login: (values: IAuthFormValues) : Promise<IUser> => Requests.post("/user/login", values),
    getCurrentUser: () : Promise<IUser> => Requests.get("/user")
}

// Games requests
export const GameRequest = {
    getAllGames: (pageNumber: number, pageSize: number) : Promise<IPaginatedGameResponse> => Requests.get(`/games?pageNumber=${pageNumber}&pageSize=${pageSize}`),
    getGame: (gameId: number) : Promise<IGame> => Requests.get(`/games/${gameId}`),
    likeGame: (gameId: number) : Promise<{}> => Requests.put(`/games/${gameId}`),
    unlikeGame: (gameId: number) : Promise<{}> => Requests.put(`/games/${gameId}/unlike`)
}

// Channel Requests
export const ChannelRequest = {
    updateChannel: (values: IChannelFormValues) : Promise<{}> => Requests.put("/channel", values),
    getChannel: (username: string): Promise<IChannel> => Requests.get(`/channel/${username}`),
    changePassword: (values: IChannelPasswordValues): Promise<{}> => Requests.put(`/channel/password`, values),
}

// subsrciption requests
export const SubscriptionRequest = {
    subscribeToUser: (username: string) : Promise<{}> => Requests.post(`/subscription/${username}/subscribe`),
    unSubscribe: (username: string) : Promise<{}> => Requests.post(`/subscription/${username}/unSubscribe`),
    getFollows: (username: string, predicate: string): Promise<IChannelUser[]> => Requests.get(`/subscription/${username}/${predicate}`)
}

// search requests
export const SearchRequest = {
    searchForClipByTitle: (title: string, pageNumber: number, pageSize: number) : Promise<IPaginatedClipResponse> => Requests.get("/search/qlips", {params: {title, pageNumber, pageSize}}),
    searchChannelByUsername: (username: string, pageNumber: number, pageSize: number): Promise<IPaginatedChannelResponse> => Requests.get(`/search/channels`, {params: {username, pageSize, pageNumber}}),
    searchGameByName: (gameName: string, pageSize: number, pageNumber: number) : Promise<IPaginatedGameResponse> => Requests.get("search/games", {params: {gameName, pageSize, pageNumber}}) 
}