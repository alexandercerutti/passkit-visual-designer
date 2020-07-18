import * as React from "react";
import { EditIcon, DeleteIcon } from "./icons";

interface PictureShowdownProps {
	name: string;
	pictureData: Blob;
	onDelete: () => void;
}

export default function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	const [lastRaw, setLastRaw] = React.useState<Blob>(props.pictureData);
	const [pictureURL, setPictureURL] = React.useState<string>(URL.createObjectURL(props.pictureData));

	React.useEffect(() => {
		if (lastRaw !== props.pictureData) {
			URL.revokeObjectURL(pictureURL);
			setLastRaw(props.pictureData);
			setPictureURL(URL.createObjectURL(props.pictureData));
		}

		if (!props.pictureData) {
			props.onDelete();
		}

		return () => pictureURL && URL.revokeObjectURL(pictureURL);
	});

	return (
		<div className="picture">
			<img src={pictureURL} alt={props.name} />
			<div className="opts">
				<div>
					<EditIcon fill="#e6e6e6" />
				</div>
				<div onClick={() => props.onDelete()}>
					<DeleteIcon fill="#e6e6e6" />
				</div>
			</div>
		</div>
	);
}
