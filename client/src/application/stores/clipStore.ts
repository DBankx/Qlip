import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IClip} from "../../infrastructure/models/clip";
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
}