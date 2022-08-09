import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { LoginUser, RegisterUser, User } from "../models/User";
import { store } from "./store";
class UserStore {
	users: User[] = [];
	user: User | null = null;
	loading: boolean = false;
	loadingInitial: boolean = false;
	username?: string | null = window.localStorage.getItem("username");
	
	constructor() {
		makeAutoObservable(this);
	}

	loadUsers = async () => {
		try {
			const response = await agent.UserRequest.list();
			response.result.forEach((user) => {
				this.users.push(user);
			});
			this.setLoadingInitial(false);
		} catch (error) {
			console.log(error);
			this.setLoadingInitial(false);
		}
	};

	setLoadingInitial = (state: boolean) => {
		this.loadingInitial = state;
	};

	get isLoggedIn() {
		return !!this.username;
	}

	login = async (credentials: LoginUser) => {
		try {
			const response = await agent.UserRequest.login(credentials);
			if (response.isSuccess) {
				store.commonStore.setToken(response.token!);
				runInAction(() => {
					this.user = response.result;
					window.localStorage.setItem("username", this.user.email);
				});
				history.push("/tweets");
				store.modalStore.closeModal();
			} else {
				throw new Error("invalid username or password");
			}
		} catch (error) {
			throw error;
		}
	};

	logout = () => {
		store.commonStore.setToken(null);
		window.localStorage.removeItem("jwt");
		window.localStorage.removeItem("username");
		this.user = null;
		this.username = null;
		history.push("/");
	};

	register = async (credentials: RegisterUser) => {
		try {
			const response = await agent.UserRequest.register(credentials);
			if (response.isSuccess) {
				runInAction(() => {
					this.user = response.result;
					console.log(response);
				});
				var cred: LoginUser = {
					username: response.result.email,
					password: credentials.password,
				};
				this.login(cred);
			} else {
				throw new Error("invalid username or password");
			}
		} catch (error) {
			throw error;
		}
	};
}

export default UserStore;
