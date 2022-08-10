import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Grid, List } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import TweetsList from "./TweetsList";

const TweetsDashboard = () => {
	const { tweetStore } = useStore();
	useEffect(() => {
		if (tweetStore.tweetRegistry.size == 0) tweetStore.loadAllTweets();
	}, [tweetStore]);

	if (tweetStore.loadingInitial)
		return <LoadingComponent content="Loading tweets" />;
	return (
		<Grid>
			<Grid.Column width="10">
				<TweetsList />
			</Grid.Column>
		</Grid>
	);
};

export default observer(TweetsDashboard);
