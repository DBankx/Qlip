import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IClip, IClipFormValues, IUploadedClipValues} from "../../infrastructure/models/clip";
import {ClipRequest} from "../api/agent";
import {toast} from "react-toastify";

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
    @observable selectedClipBlob: any = null;
    @observable deletingClip: boolean = false;

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
                runInAction(() => {
                    this.progress =  Math.round((100 * event.loaded) / event.total);
                })
            });
            runInAction(() => {
                this.uploadedClip = clip;
                this.uploadingClip = false;
            })
            toast.success("Qlip uploaded succesfully!")
        }catch(error){
            runInAction(() => {
                this.uploadingClip = false;
            })
            toast.error("Error occured while uploading!")
        }
    }
    
    @action selectClip = (previewClip: any) => {
        this.selectedClip = previewClip;
    }
    
    @action selectClipBlob = (previewClipBlob: Blob) => {
        this.selectedClipBlob = previewClipBlob;
    }
    
    // deleting the clip the user uploaded in the form
    @action deleteUploadedClip = async () => {
        this.deletingClip = true;
        try{
            if(this.uploadedClip != null){
            await ClipRequest.deleteUploadedClip(this.uploadedClip.publicId);
            runInAction(() => {
                this.uploadedClip = null;
                this.deletingClip = false;
            })
            }
        } catch(error){
            runInAction(() => {
                this.deletingClip = false;
            })
            console.log(error);
        }
    }
    
    // remove the selected clip from state
    @action removeSelectedClip = () => {
        this.selectedClipBlob = null;
        this.selectedClip = null;
    }
    
    // create a clip
    @action createClip = async (clip: IClipFormValues) => {
        try{
            const newClip = await ClipRequest.createClip(clip);
            runInAction(() => {
                this.clip = newClip;
                this.clipRegistry.set(newClip.id, newClip);
            });
            toast.success("Qlip created successfully!")
        }catch(error){
            toast.error("Error occured creating qlip!")
        }
    }
    
    @action deleteClip = async (id: string) => {
        this.deletingClip = true;
        try{
            await ClipRequest.deleteClip(id);
            runInAction(() => {
                this.clip = null;
                this.clipRegistry.delete(id);
                this.deletingClip = false;
                toast.success("Qlip succesfully deleted!");
            })
        }catch(error){
            runInAction(() => this.deletingClip = false);
            toast.error("Error deleting Qlip!");
        }
    }
}