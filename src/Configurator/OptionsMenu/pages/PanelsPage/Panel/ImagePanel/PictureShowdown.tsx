import * as React from "react";
import { EditIcon, DeleteIcon } from "./icons";
import useObjectURL from "../../../../../../useObjectURL";

interface PictureShowdownProps {
	name: string;
	pictureData: Blob;
	onDelete: () => void;
}

export default function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	const pictureURL = useObjectURL(props.pictureData);

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
