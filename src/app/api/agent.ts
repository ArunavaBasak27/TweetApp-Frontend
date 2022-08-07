import axios, { AxiosResponse } from "axios";
import { Response } from "../models/Response";
import { LoginUser, RegisterUser, User } from "../models/User";
import { store } from "../stores/store";

const sleep = (delay: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
};

axios.defaults.baseURL = "https://localhost:7055/api/v1/tweets";

axios.interceptors.request.use((config) => {
	const token = store.commonStore.token;
	if (token) config.headers!.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(async (response) => {
	try {
		await sleep(1000);
		return response;
	} catch (error) {
		console.log(error);
		return await Promise.reject(error);
	}
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) =>
		axios.post<T>(url, body).then(responseBody),
};

const UserRequest = {
	list: () => requests.get<Response<User[]>>("/users/all"),
	login: (creds: LoginUser) => requests.post<Response<User>>("/login", creds),
	register: (creds: RegisterUser) =>
		requests.post<Response<User>>("/register", creds),
};

const agent = {
	UserRequest,
};

export default agent;
