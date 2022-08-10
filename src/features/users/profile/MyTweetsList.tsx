import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Button, Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
const MyTweetsList = () => {
	const { tweetStore } = useStore();
	const { currentUserTweets } = tweetStore;
	return (
		<>
			<Segment style={{ marginTop: "3em" }}>
				<Header as="h2" content="All my tweets:" />
				<hr />
				<Item.Group divided>
					{currentUserTweets.map((tweet) => {
						return (
							<Item key={tweet.id}>
								<Item.Content>
									<Item.Header># {tweet?.tag}</Item.Header>
									<Item.Description> {tweet?.subject}</Item.Description>
									<Item.Extra>
										<Button floated="right" content="View" color="blue" />
									</Item.Extra>
								</Item.Content>
							</Item>
						);
					})}
				</Item.Group>
			</Segment>
		</>
	);
};

export default observer(MyTweetsList);
