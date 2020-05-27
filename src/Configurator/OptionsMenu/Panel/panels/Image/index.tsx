import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import PictureShowdown from "./PictureShowdown";
import useContentSavingHandler from "../useContentSavingHandler";
import "./style.less";

interface ImagePanelProps extends PanelProps {
	value?: File;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [file, onChosenFileChangedHandlerRef] = useContentSavingHandler(props.onValueChange, props.name, props.value);
	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	return (
		<>
			<h4>{showTitle}</h4>
			{file
				? <PictureShowdown
					name={props.name}
					pictureData={file}
					onDelete={onChosenFileChangedHandlerRef}
				/>
				: <UploadArea onFileUpload={onChosenFileChangedHandlerRef} />
			}
		</>
	);
}
