import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Item, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
const MyTweetsList = () => {
	const { tweetStore } = useStore();
	const { currentUserTweets, deleteTweet, loading } = tweetStore;

	const handleDelete = (username: string, id: number) => {
		deleteTweet(username, id);
	};

	if (loading) return <LoadingComponent />;

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
										<Button floated="right" content="Edit" color="blue" />
										<Button
											floated="right"
											onClick={() => handleDelete(tweet.user.email, tweet.id)}
											color="red"
											content="Delete"
										/>
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
