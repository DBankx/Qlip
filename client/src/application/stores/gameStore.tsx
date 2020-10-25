import {RootStore} from "../../application/stores/rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IGame, IPaginatedGameResponse} from "../../infrastructure/models/game";
import {GameRequest} from "../../application/api/agent";
import {toast} from "react-toastify";
import {SyntheticEvent} from "react";

export class GameStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable games: IPaginatedGameResponse | null = null;
    @observable game: IGame | null = null;
    @observable loadingGames: boolean = false;
    @observable pageNumber: number = 1;
    @observable pageSize: number = 20;
    @observable likingGame: boolean = false;
    @observable target: number = 0;
    
    @action loadGames = async () => {
        this.loadingGames = true;
        try{
            let response = await GameRequest.getAllGames(this.pageNumber, this.pageSize);
            runInAction(() => {
                this.games = response;
                this.loadingGames = false;
            })
        }catch(error){
            runInAction(() => this.loadingGames = false);
            toast.error("Problem loading games");
            throw error;
        }
    }
    
    @action viewGame = async (gameId: number) => {
        this.loadingGames = true
        try{
            let response = await GameRequest.getGame(gameId);
            runInAction(() => {
                this.game = response;
                this.loadingGames = false;
            })
        }catch(error){
            runInAction(() => this.loadingGames = false);
            toast.error("Problem loading game");
            throw error;
        }
    }
    
    @action changePage = (num: number) => {
        this.pageNumber = num;
    }
    
    @action changePageSize = (num: number) => {
        this.pageSize = num;
    }
    
    @action likeGame = async (event:SyntheticEvent<HTMLButtonElement>, gameId: number) => {
        this.likingGame = true;
        this.target = gameId; 
        try{
            await GameRequest.likeGame(gameId);
           runInAction(() => {
               if(this.games !== null){
                   let game = this.games.data.find(x => x.id === gameId);
                   game!.isLiked = true;
               }
               this.likingGame = false;
           }) 
        }catch(error){
            runInAction(() => this.likingGame = false);
            if(error.status === 400){
                toast.warn("You already like this game!")
            }
            throw error;
        }
    }
    
    @action unlikeGame = async (event:SyntheticEvent<HTMLButtonElement>, gameId: number) => {
        this.likingGame = true;
        this.target = gameId;
        try {
            await GameRequest.unlikeGame(gameId);
            runInAction(() => {
                    let game = this.games!.data.find(x => x.id === gameId);
                    game!.isLiked = false;
                    this.likingGame = false;
            })
        }catch(error){
            runInAction(() => this.likingGame = false);
            if(error.status === 400){
                toast.warn("you already unliked this game");
            }
            console.log(error);
        }
    }
    
}