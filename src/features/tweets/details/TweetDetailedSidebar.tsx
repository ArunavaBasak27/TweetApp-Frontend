import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import agent from "../../../app/api/agent";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Reactions } from "../../../app/models/Reactions";

export default observer(function TweetDetailedSidebar() {
	const { tweetStore } = useStore();

	const [likedUsers, setLikedUsers] = useState<Reactions[]>([]);
	useEffect(() => {
		agent.TweetRequest.likeDetails().then((res) => {
			setLikedUsers(
				res.result.filter((x) => x.tweetId === tweetStore.selectedTweet?.id)
			);
		});
	}, [likedUsers.length]);

	return (
		<>
			<Segment
				textAlign="center"
				style={{ border: "none" }}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				{likedUsers.length} people liked this tweet
			</Segment>

			<Segment attached>
				<List relaxed divided>
					{likedUsers &&
						likedUsers.map((x) => {
							return (
								<Item style={{ position: "relative" }}>
									<Label
										style={{ position: "absolute" }}
										color="orange"
										ribbon="right"
									>
										Host
									</Label>
									<Image size="tiny" src={"/assets/user.png"} />
									<Item.Content verticalAlign="middle">
										<Item.Header as="h3">
											<Link to={`#`}>{x.user.firstName}</Link>
										</Item.Header>
										<Item.Extra style={{ color: "orange" }}>
											<br />
											<br />
											{x.user.email}
										</Item.Extra>
									</Item.Content>
								</Item>
							);
						})}
				</List>
			</Segment>
		</>
	);
});
