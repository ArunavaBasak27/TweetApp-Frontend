import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import TweetsDashboard from "../../features/tweets/TweetsDashboard";
import UsersDashboard from "../../features/users/list/UsersDashboard";
import LoginForm from "../../features/users/LoginForm";
import PostMyTweet from "../../features/users/profile/PostMyTweet";
import ProfileDashboard from "../../features/users/profile/ProfileDashboard";
import ModalContainer from "../common/modal/ModalContainer";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";

function App() {
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.getUser().finally(() => commonStore.setAppLoaded());
		} else {
			commonStore.setAppLoaded();
		}
	}, [commonStore, userStore]);

	if (!commonStore.appLoaded)
		return <LoadingComponent content="Loading app..." />;

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
							<Route exact path="/my-profile" component={ProfileDashboard} />
							<Route exact path="/post-tweet" component={PostMyTweet} />
						</Container>
					</>
				)}
			/>
		</>
	);
}

export default observer(App);
