import {RootStore} from "../../application/stores/rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IGame, IPaginatedGameResponse} from "../../infrastructure/models/game";
import {GameRequest, SearchRequest} from "../../application/api/agent";
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
    @observable selectedGame: string = "";
    @observable showGameSearchPane: boolean = false;
    
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
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Cannot load games");
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
            this.rootStore.commonStore.showAlert("error", "Error occurred", "Cannot load game");
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

                this.rootStore.commonStore.showAlert("warn", "Warning", "You already liked this game");
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
                this.rootStore.commonStore.showAlert("warn", "Warning", "You already unliked this game");
            }
            console.log(error);
        }
    }
    
    @action searchGamesByName = async (gameName: string) => {
        this.loadingGames = true;
        try{
            let response = await SearchRequest.searchGameByName(gameName, this.pageSize, this.pageNumber);
            runInAction(() => {
                this.games = response;
                this.loadingGames= false;
            })
        }catch(error){
            runInAction(() => {
                this.loadingGames = false;
                this.rootStore.commonStore.showAlert("error", "Error occurred", "Problem loading games");
            })
            throw error;
        }
    }
    
    @action sortGamesByClipNo = async() => {
        this.loadingGames = true;
        try{
            let response = await SearchRequest.searchClipByClipNo(this.pageNumber, this.pageSize);
            runInAction(() => {
                this.games = response;
                this.loadingGames = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loadingGames = false;
                this.rootStore.commonStore.showAlert("error", "Error occurred", "Problem loading games");
            })
            throw error;
        }
    }
    
    @action selectGame = (gameName: string) => {
        this.selectedGame = gameName;
    }
    
    @action toggleGameSearchPaneOff = () => {
        this.showGameSearchPane = false; 
    }

    @action toggleGameSearchPaneOn = () => {
        this.showGameSearchPane = true;
    } 
}