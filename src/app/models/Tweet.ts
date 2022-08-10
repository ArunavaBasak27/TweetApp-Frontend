import { User } from "./User";

export interface Tweet {
	id: number;
	subject: string;
	tag?: string;
	userId: number;
	user: User;
	datePosted: string;
}

export interface CreateTweet {
	subject: string;
	tag?: string;
}
