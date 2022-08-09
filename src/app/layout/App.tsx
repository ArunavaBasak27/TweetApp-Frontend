import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import TweetsDashboard from "../../features/tweets/TweetsDashboard";
import UsersDashboard from "../../features/users/list/UsersDashboard";
import LoginForm from "../../features/users/LoginForm";
import ModalContainer from "../common/modal/ModalContainer";
import NavBar from "./NavBar";

function App() {
	return (
		<>
			<ModalContainer />
			<Route exact path="/" component={HomePage}></Route>
			<Route
				path={"/(.+)"}
				render={() => (
					<>
						<NavBar />
						<Container style={{ marginTop: "7em" }}>
							<Route exact path="/login" component={LoginForm} />
							<Route exact path="/tweets" component={TweetsDashboard} />
							<Route exact path="/allUsers" component={UsersDashboard} />
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
