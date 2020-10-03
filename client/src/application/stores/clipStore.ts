import {RootStore} from "./rootStore";
import {action, computed, observable, runInAction} from "mobx";
import {IClip} from "../../infrastructure/models/clip"
import {ClipRequest} from "../api/agent";

export class ClipStore{
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    
    // state watcher for all clips
    @observable clipRegistry: Map<string, IClip> = new Map();
    @observable loadingInitial: boolean = false;
    
    
    @computed get clipsData(){
        return Array.from(this.clipRegistry.values());
    }
    
    
    //========= load all clips ===============
    @action loadAllClips = async () => {
        this.loadingInitial = true;
        try{
            const clips: IClip[] = await ClipRequest.getAllClips();
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
}