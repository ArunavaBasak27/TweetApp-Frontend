import { observer } from "mobx-react-lite";
import { Segment, Header, Comment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import TweetDetailedChatForm from "./TweetDetailedChatForm";

export default observer(function TweetDetailedChatList() {
	const { tweetStore } = useStore();
	const { loadCurrentComments } = tweetStore;

	return (
		<>
			<Segment
				textAlign="center"
				attached="top"
				inverted
				color="teal"
				style={{ border: "none" }}
			>
				<Header>{loadCurrentComments().length} comments</Header>
			</Segment>
			<Segment attached clearing>
				<Comment.Group>
					{loadCurrentComments().map((x) => {
						return (
							<Comment key={x.id}>
								<Comment.Avatar
									src={
										x.user.photos.length == 0
											? "/assets/user.png"
											: x.user.photos[0].url
									}
								/>
								<Comment.Content>
									<Comment.Author as="a">
										{x.user.firstName!} {x.user.lastName!}
									</Comment.Author>
									<Comment.Metadata>
										<div>{x.datePosted!}</div>
									</Comment.Metadata>
									<Comment.Text>{x.message!}</Comment.Text>
									<Comment.Actions>
										<Comment.Action>Reply</Comment.Action>
									</Comment.Actions>
								</Comment.Content>
							</Comment>
						);
					})}

					<TweetDetailedChatForm />
				</Comment.Group>
			</Segment>
		</>
	);
});
