import { observer } from "mobx-react-lite";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { User } from "../../../app/models/User";

interface Props {
	profile: User | null;
}

const ProfileHeader = ({ profile }: Props) => {
	console.log(profile);
	return (
		<Segment>
			{profile && (
				<Grid.Column width={12}>
					<Item.Group>
						<Item>
							<Item.Image avatar size="small" src="/assets/user.png" />
							<Item.Content verticalAlign="middle">
								<Header as="h1" content={`${profile.email}`} />
							</Item.Content>
						</Item>
					</Item.Group>
				</Grid.Column>
			)}
		</Segment>
	);
};

export default observer(ProfileHeader);
