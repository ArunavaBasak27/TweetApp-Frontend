import { Button, Item, Label } from "semantic-ui-react";
import { Tweet } from "../../app/models/Tweet";

interface Props {
	tweet: Tweet;
}
const TweetListItem = ({ tweet }: Props) => {
	return (
		<>
			<Item>
				<Item.Content>
					<Item.Header as="a">{tweet.subject}</Item.Header>
					<Item.Meta>Date Posted: {tweet.datePosted}</Item.Meta>
					<Item.Description>Posted by: @{tweet.user.email}</Item.Description>
					<Item.Extra>
						<Button floated="right" content="View" color="blue" />
						<Label floated="left" content={`# ${tweet.tag}`!} />
					</Item.Extra>
				</Item.Content>
			</Item>
		</>
	);
};

export default TweetListItem;
