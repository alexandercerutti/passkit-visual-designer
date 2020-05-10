import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import "./style.less";
import { EditIcon, DeleteIcon } from "./icons";

interface ImagePanelProps extends PanelProps {
	fileURL?: string;
}

export default function ImagePanel(props: ImagePanelProps) {
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const onChosenFileChangedHandlerRef = React.useRef((file?: File) => {
		// Send the url outside
	});

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			{props.fileURL
				? <PictureShowdown
					name={props.name}
					pictureURL={props.fileURL}
					onDelete={onChosenFileChangedHandlerRef.current}
				/>
				: <UploadArea onFileUpload={onChosenFileChangedHandlerRef.current} />
			}
		</div>
	);
}

interface PictureShowdownProps {
	name: string;
	pictureURL: string;
	onDelete: () => void;
}

function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	return (
		<div className="picture">
			<img src={props.pictureURL} alt={props.name} />
			<div className="opts">
				<div>
					<EditIcon fill="#e6e6e6" />
				</div>
				<div onClick={props.onDelete}>
					<DeleteIcon fill="#e6e6e6" />
				</div>
			</div>
		</div>
	);
}
