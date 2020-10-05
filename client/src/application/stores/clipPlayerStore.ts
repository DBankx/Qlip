import {RootStore} from "./rootStore";
import {action, makeObservable, observable} from "mobx";

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
    
    
}