import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IClip, IClipFormValues, IPaginatedClipResponse, IUploadedClipValues} from "../../infrastructure/models/clip";
import {ClipRequest, SearchRequest} from "../api/agent";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

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
    @observable.ref hubConnection: HubConnection | null = null;
    @observable SearchResponse: IPaginatedClipResponse | null = null;
    @observable SearchPageNumber: number = 1;
    @observable SearchPageSize: number = 20;

    @computed get clipsData(){
        return Array.from(this.clipRegistry.values());
    }
    
    // build hub connection
    @action startConnection = async(clipId: string) => {
        this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/comment", {
            accessTokenFactory: () => this.rootStore.commonStore.token!
        }).configureLogging(LogLevel.Information).withAutomaticReconnect().build();
        
        this.hubConnection.start().then(() => console.log(this.hubConnection!.state)).then(() => {
            console.log("Attempting to join qlip");
            this.hubConnection && this.hubConnection.invoke("AddToGroup", clipId);
        }).catch(error => console.log("Error establishing connection", error));
        
        this.hubConnection.on("RecieveComment", comment => {
            runInAction(() => {
                this.clip!.comments.push(comment);
            })
        })
      
    }
    
    @action startConn = async (clipId: string) => {
        this.hubConnection = new HubConnectionBuilder().withUrl("http://localhost:5000/comment", {
            accessTokenFactory: () => this.rootStore.commonStore.token!
        }).withAutomaticReconnect().configureLogging(LogLevel.Information).build();
        
        try {
            await this.hubConnection.start();
            console.log(this.hubConnection.state);
            await this.hubConnection.invoke("AddToGroup", clipId).catch((err) => console.log(err.toString()))
        }catch(error){
            console.log("ther was an error", error);
            this.rootStore.commonStore.showAlert("error", "Error establishing connection", "Please refresh");
        }

        this.hubConnection.on("RecieveComment", comment => {
            runInAction(() => {
                this.clip!.comments.push(comment);
            })
        })
        
    }

    @action stopHubConnection = () => {
        this.hubConnection!.invoke("RemoveFromGroup", this.clip!.id).then(() =>
            this.hubConnection!.stop()).then(() => console.log("Connection stopped")).catch((err) => console.log(err))
    }

    @action addComment = async (values: any) => {
        values.clipId = this.clip!.id;
        try{
            await this.hubConnection!.invoke("SendComment", values);
        }catch(error){
            console.log(error);
        }
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
                if(this.rootStore.authStore.user?.username === this.clip.authorName){
                    this.clip.isUser = true;
                }
                this.loadingInitial = false;
            } else {
                let clipFromApi = await ClipRequest.getClip(id);
                runInAction(() => {
                    this.clip = clipFromApi;
                    if(this.rootStore.authStore.user?.username === this.clip.authorName){
                        this.clip.isUser = true;
                    }
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
            this.rootStore.commonStore.showAlert("success", "Success", "Qlip uploaded sucessfully!");
        }catch(error){
            runInAction(() => {
                this.uploadingClip = false;
            })

            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
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
                newClip.comments = [];
                this.clip = newClip;
                this.clipRegistry.set(newClip.id, newClip);
            });
            this.rootStore.commonStore.showAlert("success", "", "Qlip created succesfully!");
        }catch(error){
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
        }
    }
   
    @action updateClip = async (values: IClipFormValues) => {
        try{
            var clip = await ClipRequest.updateClip(values);
            runInAction(() => {
                this.clip = clip;
                this.clipRegistry.set(clip.id, clip);
            })
            this.rootStore.commonStore.showAlert("success", "", "Qlip updated sucessfully!");
        }catch(error){
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
            throw error;
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
                this.rootStore.commonStore.showAlert("success", "Deleted", "Qlip deleted sucessfully!");
            })
        }catch(error){
            runInAction(() => this.deletingClip = false);
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
        }
    }
    
    @action likeClip = async (clipId: string) => {
        try{
            await ClipRequest.likeClip(clipId);
            runInAction(() => {
                this.clip!.likes++
                if(this.clip!.isDisliked){
                    this.clip!.dislikes--
                }
                this.clip!.isLiked = true;
                this.clip!.isDisliked = false;
            })
        }catch(error){
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
            throw error;
        }
    }
    
    @action dislikeClip = async (clipId: string) => {
        try{
            await ClipRequest.dislikeClip(clipId);
            runInAction(() => {
                this.clip!.dislikes++
                if(this.clip!.isLiked){
                    this.clip!.likes--;
                }
                this.clip!.isDisliked = true;
                this.clip!.isLiked = false;
            })
        }catch(error){
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Operation unsuccessful!");
            throw error;
        }
    }
    
    // search for a clip by title
    @action searchClipByTitle = async (title: string) => {
       this.loadingInitial = true;
       try{
           let response = await SearchRequest.searchForClipByTitle(title, this.SearchPageNumber, this.SearchPageSize);
           runInAction(() => {
               this.SearchResponse = response;
               this.loadingInitial = false;
           })
       }catch(error){
           runInAction(() => this.loadingInitial = false);
           this.rootStore.commonStore.showAlert("error", "Error Occurred", "Problem searching qlips");
           throw error;
       }
    }
    
    @action changePageSize = (num: number) => {
        this.SearchPageSize = num;
    }
    
    @action changePage = (num: number) => {
        this.SearchPageNumber = num;
    }
}