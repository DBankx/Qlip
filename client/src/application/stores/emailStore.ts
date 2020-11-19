import {RootStore} from "./rootStore";
import {action, makeObservable, observable, runInAction} from "mobx";
import {IEmailFormValues} from "../../infrastructure/models/email";
import {EmailRequest} from "../api/agent";

export class EmailStore{
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);
    }
    
    @observable sendingEmail: boolean = false;
    
    @action sendEmail = async (values: IEmailFormValues) => {
        this.sendingEmail = true;
        try{
           await EmailRequest.sendEmail(values);
           runInAction(() => {
               this.rootStore.commonStore.showAlert("success", "Email sent", "Your query will reach us soon!");
               this.sendingEmail = false;
           })
        }catch (error) {
            runInAction(() => this.sendingEmail = false);
            this.rootStore.commonStore.showAlert("error", "Error sending email", "Error occurred when sending email");
            throw error;
        }
    }
    
}