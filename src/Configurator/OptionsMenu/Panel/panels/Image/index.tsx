import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import "./style.less";

interface ImagePanelProps extends PanelProps {
	fileURL?: string;
}

export default function ImagePanel(props: ImagePanelProps) {
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const onFileUploadHandlerRef = React.useRef((file: File) => {
		// Send the url outside
	});

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			{props.fileURL
				? <PictureShowdown name={props.name} pictureURL={props.fileURL} />
				: <UploadArea onFileUpload={onFileUploadHandlerRef.current} />
			}
		</div>
	);
}

interface PictureShowdownProps {
	name: string;
	pictureURL: string;
}

function PictureShowdown(props: PictureShowdownProps): JSX.Element {
	return (
		<div className="picture">
			<img src={props.pictureURL} alt={props.name} />
		</div>
	);
}

