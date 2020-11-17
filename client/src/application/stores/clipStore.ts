import {RootStore} from "./rootStore";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {IClip, IClipFormValues, IPaginatedClipResponse, IUploadedClipValues} from "../../infrastructure/models/clip";
import {ClipRequest, SearchRequest} from "../api/agent";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {boolean} from "yup";

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
    @observable uploadedClip: IUploadedClipValues = {publicId: "", url: "", thumbnail: "", duration: null, created_at: null, format: null, frame_rate: null, original_filename: null};
    @observable deletingClip: boolean = false;
    @observable.ref hubConnection: HubConnection | null = null;
    @observable SearchResponse: IPaginatedClipResponse | null = null;
    @observable SearchPageNumber: number = 1;
    @observable SearchPageSize: number = 20;
    @observable deletingComment: boolean = false;
    @observable UpNextClips: IClip[] = [];
    @observable watchedClips: IClip[] = [];
    @observable autoPlay: boolean = true;

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
                const isClipWatched = this.watchedClips.find((c) => c.id === clip!.id);
                if(!isClipWatched){
                    this.watchedClips.push(clip);
                }
                this.loadingInitial = false;
            } else {
                let clipFromApi = await ClipRequest.getClip(id);
                runInAction(() => {
                    this.clip = clipFromApi;
                    if(this.rootStore.authStore.user?.username === this.clip.authorName){
                        this.clip.isUser = true;
                    }
                    const isClipWatched = this.watchedClips.find((c) => c.id === clip!.id);
                    if(!isClipWatched){
                        this.watchedClips.push(clipFromApi);
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
    
    // deleting the clip the user uploaded in the form
    @action deleteUploadedClip = async () => {
        this.deletingClip = true;
        try{
            if(this.uploadedClip != null){
            await ClipRequest.deleteUploadedClip(this.uploadedClip.publicId);
            runInAction(() => {
                this.uploadedClip = {publicId: "", url: "", thumbnail: "", original_filename: null, frame_rate: null, format: null, created_at: null, duration: null};
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
   
    @action setUploadedClip = (publicId: string, url: string, thumbnail: string, created_at: Date, duration: number, original_filename: string, frame_rate: number, format: string) => {
        this.uploadedClip.publicId = publicId;
        this.uploadedClip.url = url;
        this.uploadedClip.thumbnail = thumbnail;
        this.uploadedClip.duration = duration;
        this.uploadedClip.format = format;
        this.uploadedClip.created_at = created_at;
        this.uploadedClip.frame_rate = frame_rate;
        this.uploadedClip.original_filename = original_filename;
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
    
    @action deleteComment = async (commentId: string) => {
        this.deletingComment = true;
        try{
            await ClipRequest.deleteComment(commentId);
            runInAction(() => {
                this.clip!.comments = this.clip!.comments.filter((c) => c.id !== commentId);
                this.deletingComment = false;
                this.rootStore.commonStore.showAlert("success", "Comment deleted", "");
            })
            } catch(error){
            runInAction(() => this.deletingComment = false);
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Error deleting comment");
            throw error;
        }
    }
    
    @action sortSearchedClip = (predicate: string)=> {
        switch(predicate){
            case "VIEWS":
                this.SearchResponse!.data.sort((a, b) => {
                    return b.views - a.views; 
                });
                break;
            case "NEWEST":
                this.SearchResponse!.data.sort((a: IClip, b:IClip) => {
                    var oldDate = new Date(a.createdAt);
                    var newDate = new Date(b.createdAt);
                    return newDate.getTime() - oldDate.getTime();
                });
                break;
            case "OLDEST":
                this.SearchResponse!.data.sort((a: IClip, b:IClip) => {
                    var oldDate = new Date(a.createdAt);
                    var newDate = new Date(b.createdAt);
                    return oldDate.getTime() - newDate.getTime();
                });
                break;
            default:
                return this.SearchResponse!.data;
        }
    }
    
    @action getRecommended = async () => {
        this.loadingInitial = true;
        try{
           const fullSearchedClips = await SearchRequest.searchClipByGameName(this.clip!.gameName, this.SearchPageNumber, this.SearchPageSize);
           console.log(fullSearchedClips.data);
           runInAction(() => {
             this.UpNextClips = fullSearchedClips.data.filter((clip) => this.watchedClips.every((watched) => watched.id !== clip.id)); 
               this.loadingInitial = false;
           })
        }catch(error){
            runInAction(() => this.loadingInitial = false);
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Problem loading recommended")
            throw error;
        }
    }
    
    @action setAutoPlay = (event:boolean) => {
        this.autoPlay = event;
    }
}

