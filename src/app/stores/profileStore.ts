import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User } from "../models/User";

export default class ProfileStore{
    profile:User|null=null;
    loadingProfile=false;

    constructor(){
        makeAutoObservable(this);
    }

    loadProfile=async(username:string)=>{
        this.loadingProfile=true;
        try {
            const response=await agent.UserRequest.search(username);
            runInAction(()=>{
                this.profile=response.result[0];
                this.loadingProfile=false;
            })
        } catch (error) {
            
        }

    }
}