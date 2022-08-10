import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { CreateTweet } from "../../../app/models/Tweet";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import * as Yup from "yup";
import { history } from "../../..";

const PostMyTweet = () => {
	const { userStore, tweetStore } = useStore();
	const [tweet, setTweet] = useState<CreateTweet>({
		tag: "",
		subject: "",
	});

	const validationSchema = Yup.object({
		tag: Yup.string().optional(),
		subject: Yup.string().required("This is a required field"),
	});

	const handleFormSubmit = (tweet: CreateTweet) => {
		tweetStore
			.createTweet(userStore.user?.email || "", tweet)
			.then(() => history.push("/my-profile"));
	};

	return (
		<Segment clearing>
			<Formik
				enableReinitialize={true}
				validationSchema={validationSchema}
				initialValues={{ tag: "", subject: "" }}
				onSubmit={(values) => handleFormSubmit(values)}
			>
				{({ isValid, isSubmitting, handleSubmit }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<Header as="h2" content="Post tweet" color="teal" />
						<MyTextInput name="tag" placeholder="Enter tag...." />
						<MyTextArea
							rows={3}
							name="subject"
							placeholder="Enter subject..."
						/>
						<Button
							type="submit"
							content="submit"
							disabled={!isValid || isSubmitting}
							floated="right"
							color="green"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
};

export default observer(PostMyTweet);
