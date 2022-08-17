import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import GetAllTweetsOfUser from "./GetAllTweetsOfUser";
interface Props {
	username: string;
}
const ProfileContent = ({ username }: Props) => {
	const panes = [
		{ menuItem: "About", render: () => <Tab.Pane>About Content</Tab.Pane> },
		{ menuItem: "Photos", render: () => <Tab.Pane>Photos Content</Tab.Pane> },
		{
			menuItem: "Tweets",
			render: () => <GetAllTweetsOfUser username={username} />,
		},
	];
	const { userStore, tweetStore } = useStore();
	const {
		loadAllTweets,
		selectTweet,
		tweetRegistry,
		selectedTweet,
		loadingInitial,
	} = tweetStore;
	useEffect(() => {
		if (tweetStore.tweetRegistry.size <= 1 || tweetStore.editMode)
			tweetStore.loadAllTweets();
	}, [
		tweetRegistry.size,
		tweetStore.editMode,
		tweetStore.loading,
		loadAllTweets,
		loadingInitial,
		selectedTweet,
		selectTweet,
		username,
	]);
	return (
		<Tab
			menu={{ fluid: true, vertical: true }}
			menuPosition="right"
			panes={panes}
		/>
	);
};

export default observer(ProfileContent);
