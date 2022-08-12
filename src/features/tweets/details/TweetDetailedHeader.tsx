import { observer } from "mobx-react-lite";
import { Button, Header, Item, Segment, Image } from "semantic-ui-react";
import { Tweet } from "../../../app/models/Tweet";

interface Props {
	tweet: Tweet;
}

export default observer(function TweetDetailedHeader({ tweet }: Props) {
	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Content>
							<Header
								size="huge"
								content={`#${tweet.tag}`}
								// style={{ color: "white" }}
							/>
							<p>{tweet.datePosted}</p>
							<p>
								Hosted by <strong>{tweet.user?.email}</strong>
							</p>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment clearing attached="bottom">
				<Button color="teal" icon="like" />
			</Segment>
		</Segment.Group>
	);
});
