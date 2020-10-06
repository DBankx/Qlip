import {RootStore} from "./rootStore";
import {action, makeObservable, observable} from "mobx";
import formatVideoTime from "../../infrastructure/HelperFunctions/formatVideoTime";

//========================================================================
//============= Store for clip player state in the app ================
//========================================================================


export class ClipPlayerStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable playing: boolean = false;
    @observable muted: boolean = false;
    @observable volume: number = 0.5;
    @observable played: number = 0;
    @observable seeking: boolean = false;
    @observable elapsedTime: string = "00:00";
    @observable totalDuration: string = "00:00";
    @observable timeDisplayFormat: string = "normal";
    
    @action togglePlayButton = () => {
        this.playing = !this.playing;
    }
    
    @action toggleMute = () => {
        this.muted = !this.muted;
    }
    
    @action updateVolume = (e: any) => {
        this.volume = e/10;
        this.muted = e === 0;
    }
    
    @action updatePlayed = (number: any) => {
        this.played = number;
    }
    
    @action seek = () => {
        this.seeking = true;
    }
    
    @action stopSeeking = () => {
        this.seeking = false;
    }
    
    @action setElapsedTime = (time: any) => {
        this.elapsedTime = this.timeDisplayFormat === "normal" ? formatVideoTime(time) : `-${formatVideoTime(time)}` ;
    }
    
    @action setDuration = (time: any) => {
        this.totalDuration = formatVideoTime(time);
    }
    
    @action changeTimeDisplayFormat = () => {
        this.timeDisplayFormat = this.timeDisplayFormat === "normal" ? "remaining" : "normal";
    }
    
    @action handleVideoProgress = () => {
        
    }

    
    
}