import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { CreateTweet, Tweet } from "../models/Tweet";
import { store } from "./store";

class TweetStore {
	tweets: Tweet[] = [];
	tweetRegistry = new Map<string, Tweet>();
	selectedTweet: Tweet | null = null;
	editMode = false;
	loading = false;
	loadingInitial = true;

	constructor() {
		makeAutoObservable(this);
	}

	get tweetsByDate() {
		return Array.from(this.tweetRegistry.values()).sort((a, b) => {
			return Date.parse(b.datePosted) - Date.parse(a.datePosted);
		});
	}

	get groupedTweets() {
		return Object.entries(
			this.tweetsByDate.reduce((tweets, tweet) => {
				const user = tweet.user.email;
				tweets[user] = tweets[user] ? [...tweets[user], tweet] : [tweet];
				return tweets;
			}, {} as { [key: string]: Tweet[] })
		);
	}

	get currentUserTweets() {
		return Array.from(this.tweetRegistry.values())
			.sort((a, b) => {
				return Date.parse(b.datePosted) - Date.parse(a.datePosted);
			})
			.filter((x) => x.user.email === store.userStore.user?.email);
	}

	loadAllTweets = async () => {
		try {
			const response = await agent.TweetRequest.list();
			runInAction(() => {
				if (response.isSuccess) {
					const tweetList = response.result;
					tweetList.forEach((tweet) => {
						//this.tweets.push(tweet);
						this.tweetRegistry.set(tweet.id.toString(), tweet);
					});
					this.loadingInitial = false;
				} else {
					this.loadingInitial = false;
					history.push("/login");
				}
			});
		} catch (error) {
			console.log("error");
		}
	};

	createTweet = async (username: string, tweetObj: CreateTweet) => {
		try {
			const response = await agent.TweetRequest.createTweet(tweetObj, username);
			if (response.isSuccess) {
				history.push("/my-profile");
			}
		} catch (error) {
			console.log(error);
		}
	};
}
export default TweetStore;
