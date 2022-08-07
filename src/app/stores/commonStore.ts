import { makeAutoObservable } from "mobx";

class CommonStore {
	token: string | null = window.localStorage.getItem("jwt");
	appLoaded = false;

	constructor() {
		makeAutoObservable(this);
		
	}

	setToken = (token: string | null) => {
		if (token) window.localStorage.setItem("jwt", token);
		this.token = token;
	};
	
	setAppLoaded = () => {
		this.appLoaded = true;
	};
}

export default CommonStore;
