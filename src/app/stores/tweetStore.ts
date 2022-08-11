import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { CreateTweet, Tweet } from "../models/Tweet";
import { store } from "./store";

class TweetStore {
	tweets: Tweet[] = [];
	tweetRegistry = new Map<string, Tweet>();
	selectedTweet: Tweet | undefined = undefined;
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

	selectTweet = async (id: number) => {
		let tweet: Tweet | undefined = this.getATweet(id);
		if (tweet) {
			this.selectedTweet = tweet;
		} else {
			this.loadingInitial = true;
			try {
				var response = await agent.TweetRequest.details(id);
				runInAction(() => {
					if (response.isSuccess) {
						tweet = response.result;
						this.loadingInitial = false;
						this.selectedTweet = tweet;
					}
					console.log(tweet);
				});
			} catch (error) {
				console.log(error);
				runInAction(() => {
					this.loadingInitial = false;
				});
			}
		}
	};

	deleteTweet = async (username: string, id: number) => {
		this.loading = true;
		try {
			var response = await agent.TweetRequest.delete(username, id);
			runInAction(() => {
				this.tweetRegistry.delete(id.toString());
				this.loading = false;
			});
		} catch (error) {
			runInAction(() => {
				console.log(error);
				this.loading = false;
			});
		}
	};

	private getATweet = (id: number) => {
		return this.tweetRegistry.get(id.toString());
	};
}
export default TweetStore;
