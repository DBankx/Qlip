import {RootStore} from "../../application/stores/rootStore";
import {makeObservable, observable} from "mobx";
import {IGame} from "../../infrastructure/models/game";

export class GameStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable games: IGame[] | null = null;
    @observable game: IGame | null = null;
    @observable loadingGames: boolean = false;
    
    
}