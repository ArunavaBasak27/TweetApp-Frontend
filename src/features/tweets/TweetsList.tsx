import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import TweetListItem from "./TweetListItem";

const TweetsList = () => {
	const { tweetStore } = useStore();
	return (
		<Segment>
			<Item.Group divided>
				{tweetStore.tweets.map((tweet) => {
					return <TweetListItem key={tweet.id} tweet={tweet} />;
				})}
			</Item.Group>
		</Segment>
	);
};

export default observer(TweetsList);
