import axios from "axios";

const TweetsDashboard = () => {
	{
		axios.get("/all").then((response) => {
			console.log(response);
		});
	}
	return (
		<div>
			<h2>Tweets</h2>
		</div>
	);
};

export default TweetsDashboard;
