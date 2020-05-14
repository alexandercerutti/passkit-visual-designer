import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import PictureShowdown from "./PictureShowdown";
import "./style.less";

interface ImagePanelProps extends PanelProps {
	value?: File;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [file, setFile] = React.useState<File>(props.value || null);
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	const onChosenFileChangedHandlerRef = React.useRef((file?: File) => {
		setFile(file);
		props.onValueChange(props.name, file);
	});

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			{file
				? <PictureShowdown
					name={props.name}
					pictureData={file}
					onDelete={onChosenFileChangedHandlerRef.current}
				/>
				: <UploadArea onFileUpload={onChosenFileChangedHandlerRef.current} />
			}
		</div>
	);
}
