import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

const RegisterForm = () => {
	const { userStore } = useStore();
	return (
		<Formik
			initialValues={{
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
				contactNumber: "",
			}}
			onSubmit={(values) => userStore.register(values)}
		>
			{({ handleSubmit, isSubmitting }) => (
				<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
					<Header
						as="h2"
						content="SignUp to TweetApp"
						color="teal"
						textAlign="center"
					/>
					<MyTextInput name="firstName" placeholder="firstName" />
					<MyTextInput name="lastName" placeholder="lastName" />
					<MyTextInput name="email" placeholder="email" />
					<MyTextInput name="password" type="password" placeholder="password" />
					<MyTextInput
						name="confirmPassword"
						type="password"
						placeholder="confirmPassword"
					/>
					<MyTextInput name="contactNumber" placeholder="contactNumber" />

					<Button
						loading={isSubmitting}
						positive
						content="Register"
						type="submit"
						fluid
					/>
				</Form>
			)}
		</Formik>
	);
};

export default observer(RegisterForm);
