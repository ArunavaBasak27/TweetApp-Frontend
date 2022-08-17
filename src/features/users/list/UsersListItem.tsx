import { Link } from "react-router-dom";
import { Item } from "semantic-ui-react";
import { User } from "../../../app/models/User";

interface Props {
	user: User;
}

const UsersListItem = ({ user }: Props) => {
	return (
		<Item>
			<Item.Content>
				<Item.Header>
					{user.firstName} {user.lastName}
				</Item.Header>
				<Item.Meta>
					Username:
					<Link to={`/profiles/${user.email}`}>{user.email}</Link>
				</Item.Meta>
				<Item.Description>Contact:+91{user.contactNumber}</Item.Description>
			</Item.Content>
		</Item>
	);
};

export default UsersListItem;
