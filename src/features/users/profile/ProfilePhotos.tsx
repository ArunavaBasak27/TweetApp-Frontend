import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";
import { User } from "../../../app/models/User";
import { useStore } from "../../../app/stores/store";
interface Props {
	profile: User;
}

const ProfilePhotos = ({ profile }: Props) => {
	const {
		profileStore: { isCurrentUser, uploadPhoto, uploading },
	} = useStore();

	const [addPhotoMode, setAddPhotoMode] = useState(false);

	const handlePhotoUpload = (file: Blob) => {
		uploadPhoto(file).then(() => setAddPhotoMode(false));
	};

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header icon="image" floated="left" content="Photos" />
					{isCurrentUser && (
						<Button
							floated="right"
							basic
							content={addPhotoMode ? "Cancel" : "Add Photo"}
							onClick={() => setAddPhotoMode(!addPhotoMode)}
						/>
					)}
				</Grid.Column>
				<Grid.Column width={16}>
					{addPhotoMode ? (
						<PhotoUploadWidget
							uploadPhoto={handlePhotoUpload}
							loading={uploading}
						/>
					) : (
						<Card.Group itemsPerRow={5}>
							{profile.photos &&
								profile.photos.map((photo) => {
									return (
										<Card key={photo.id}>
											<Image key={photo.id} src={photo.url} />
										</Card>
									);
								})}
						</Card.Group>
					)}
				</Grid.Column>
			</Grid>
		</Tab.Pane>
	);
};

export default observer(ProfilePhotos);
