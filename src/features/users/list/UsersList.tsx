import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
	const { userStore } = useStore();
	const { users } = userStore;
	return (
		<Segment>
			<Item.Group divided>
				{users &&
					users.map((user) => {
						return <UsersListItem key={user.loginId} user={user} />;
					})}
			</Item.Group>
		</Segment>
	);
};

export default observer(UsersList);
