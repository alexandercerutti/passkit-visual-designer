import * as React from "react";
import { EditIcon, DeleteIcon } from "./icons";

interface PictureShowdownProps {
	name: string;
	pictureData: Blob;
	onDelete: () => void;
}

export default function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	const [pictureURL, setPictureURL] = React.useState(null);

	React.useEffect(() => {
		if (pictureURL !== props.pictureData) {
			URL.revokeObjectURL(pictureURL);
			setPictureURL(URL.createObjectURL(props.pictureData));
		}

		if (!props.pictureData) {
			props.onDelete();
		}

		return () => URL.revokeObjectURL(pictureURL);
	}, [props.pictureData]);

	return (
		<div className="picture">
			<img src={pictureURL} alt={props.name} />
			<div className="opts">
				<div>
					<EditIcon fill="#e6e6e6" />
				</div>
				<div onClick={() => setPictureURL(null)}>
					<DeleteIcon fill="#e6e6e6" />
				</div>
			</div>
		</div>
	);
}
