import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import TweetListItem from "./TweetListItem";

const TweetsList = () => {
	const { tweetStore } = useStore();
	const { tweetsByDate, groupedTweets } = tweetStore;
	console.log(groupedTweets);
	return (
		<>
			{groupedTweets.map(([group, tweets]) => {
				return (
					<Fragment key={group}>
						<Header sub color="teal">
							{group.toLowerCase()}
						</Header>
						<Segment>
							<Item.Group divided>
								{tweets.map((tweet) => {
									return <TweetListItem key={tweet.id} tweet={tweet} />;
								})}
							</Item.Group>
						</Segment>
					</Fragment>
				);
			})}
		</>
	);
};

export default observer(TweetsList);
/* <Segment>
			<Item.Group divided>
				{tweetsByDate.map((tweet) => {
					return <TweetListItem key={tweet.id} tweet={tweet} />;
				})}
			</Item.Group>
		</Segment>
 */
