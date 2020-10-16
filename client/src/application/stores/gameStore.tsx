import {RootStore} from "../../application/stores/rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IGame, IPaginatedGameResponse} from "../../infrastructure/models/game";
import {GameRequest} from "../../application/api/agent";
import {toast} from "react-toastify";

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
    
}