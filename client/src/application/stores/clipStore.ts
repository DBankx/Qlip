import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IClip, IUploadedClipValues} from "../../infrastructure/models/clip";
import {ClipRequest} from "../api/agent";

//========================================================================
//============= Store for clip states in the app ================
//========================================================================


export class ClipStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    // state watcher for all clips
    @observable clipRegistry: Map<string, IClip> = new Map();
    @observable loadingInitial: boolean = false;
    @observable clip: IClip | null = null;
    @observable uploadedClip: IUploadedClipValues | null = null;
    @observable uploadingClip: boolean = false;
    @observable progress: number = 0;
    @observable selectedClip: string | null = null;

    @computed get clipsData(){
        return Array.from(this.clipRegistry.values());
    }
    
    //========= load all clips ===============
    @action loadAllClips = async () => {
        this.loadingInitial = true;
        try{
            const clips = await ClipRequest.getAllClips();
            runInAction(() => {
                clips.forEach((clip: IClip) => {
                    this.clipRegistry.set(clip.id, clip);
                })
                this.loadingInitial = false;
            })
        }catch (error) {
            runInAction(() => {
                this.loadingInitial = false;
            })
            console.log(error);
        }
    }
    
    // ========== load a single clip from the registry or the api ===========
    @action getClip = async (id: string) => {
        this.loadingInitial = true;
        try{
            let clip = this.clipRegistry.get(id);
            if(clip != null){
                this.clip = clip;
                this.loadingInitial = false;
            } else {
                let clipFromApi = await ClipRequest.getClip(id);
                runInAction(() => {
                    this.clip = clipFromApi;
                    this.loadingInitial = false;
                })
            }
        }catch(error){
            runInAction(() => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    }
    
    @action uploadClip = async (videoFile: Blob) => {
        this.uploadingClip = true;
        try{
            const clip = await ClipRequest.uploadClip(videoFile, (event: ProgressEvent) => {
                runInAction(() => {this.progress =  Math.round((100 * event.loaded) / event.total);})
            });
            runInAction(() => {
                this.uploadedClip = clip;
                this.uploadingClip = false;
            })
        }catch(error){
            runInAction(() => {
                this.uploadingClip = false;
            })
            console.log(error);
        }
    }
    
    @action selectClip = (previewClip: any) => {
        this.selectedClip = previewClip;
    }
}