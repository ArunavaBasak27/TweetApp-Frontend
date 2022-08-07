import { NavLink } from "react-router-dom";
import { Container, Icon, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";

const NavBar = () => {
	const { userStore } = useStore();
	const { user, logout } = userStore;
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} exact to="/" header>
					<Icon name="twitter" style={{ marginRight: "10px" }} size="huge" />
					TweetApp
				</Menu.Item>
				<Menu.Item name="Tweets" />
				<Menu.Item position="right">
					<Image src="/assets/user.png" avatar spaced="right" />
					{window.localStorage.getItem("username") && (
						<Dropdown
							pointing="top left"
							text={window.localStorage.getItem("username") || " "}
						>
							<Dropdown.Menu>
								<Dropdown.Item text="My Profile" icon="user" />
								<Dropdown.Item onClick={logout} text="logout" icon="power" />
							</Dropdown.Menu>
						</Dropdown>
					)}
				</Menu.Item>
			</Container>
		</Menu>
	);
};

export default NavBar;
