import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {IClip, IUploadedClipValues} from "../../infrastructure/models/clip";
import * as fs from "fs";

// setting the default url
axios.defaults.baseURL = "http://localhost:5000/api";


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
    get: (url: string) => axios.get(url).then(sleep(1000)).then(ResponseBody),
    post:(url: string, body: {}, config? :{} ) => axios.post(url, body, config).then(sleep(1000)).then(ResponseBody),
    delete:(url: string) => axios.delete(url).then(sleep(1000)).then(ResponseBody),
    put:(url: string, body:{}, config?:{}) => axios.put(url, body, config).then(sleep(1000)).then(ResponseBody),
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
    uploadClip: (clip: Blob, uploadProgress: any): Promise<IUploadedClipValues> => Requests.uploadVideo("/clip/upload", clip, uploadProgress)
}