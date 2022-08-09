import { Icon, Item, Segment } from "semantic-ui-react";
import { Tweet } from "../../app/models/Tweet";

interface Props {
	tweet: Tweet;
}
const TweetListItem = ({ tweet }: Props) => {
	return (
		<>
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image
								floated="left"
								size="tiny"
								circular
								src="/assets/user.png"
							/>
						</Item>
						<Item.Content>
							<Item.Header># {tweet.tag}</Item.Header>
							<Item.Description>
								By @{tweet.user.firstName}.{tweet.user.lastName}
							</Item.Description>
						</Item.Content>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" />
						{tweet.datePosted}
						<br />
						<Icon name="like" color="red" />
						(5)
					</span>
				</Segment>
				<Segment>
					<span>{tweet.subject}</span>
				</Segment>
			</Segment.Group>
		</>
	);
};

export default TweetListItem;
