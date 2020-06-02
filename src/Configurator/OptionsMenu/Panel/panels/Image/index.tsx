import * as React from "react";
import { PanelProps } from "../..";
import UploadArea from "./UploadArea";
import PictureShowdown from "./PictureShowdown";
import useContentSavingHandler from "../useContentSavingHandler";
import FieldTitle from "../FieldTitle";
import "./style.less";

interface ImagePanelProps extends PanelProps {
	value?: File;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [file, onChosenFileChangedHandlerRef] = useContentSavingHandler(props.onValueChange, props.name, props.value);

	return (
		<>
			<FieldTitle name={props.name} />
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
