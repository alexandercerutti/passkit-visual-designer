import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

import UploadIcon from "./uploadIcon";

interface ImagePanelProps extends PanelProps {
	// value: ArrayBuffer;
}

const enum FileState {
	NONE,
	LOADED,
	LOADING
}

interface PanelState {
	state: FileState;
	file: File;
}

export default function ImagePanel(props: ImagePanelProps) {
	const [picture, setPicture] = React.useState<File>(null);
	const [dragging, setDragging] = React.useState(false);
	const areaRef = React.useRef<HTMLDivElement>(null);

	const inputFileHandlerRef = React.useRef((files: FileList) => {
		console.log("Received some files to handle.", files);
	});

	const onDragOverHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		if (!dragging) {
			setDragging(true);
		}
	});

	const onDragLeaveHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) =>
		setDragging(false)
	);

	const onDropHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();

		setDragging(false);
		inputFileHandlerRef.current(event.dataTransfer.files);
	});

	const onChangeHandlerRef = React.useRef((event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		inputFileHandlerRef.current(event.target.files);
	});

	const showTitle = props.name.replace(/([a-z])([A-Z])/g, "$1 $2");

	return (
		<div className="panel image" data-name={props.name}>
			<h4>{showTitle}</h4>
			<input type="file" id="fileUpload" hidden value={picture && picture.name} onChange={onChangeHandlerRef.current} />
			<label htmlFor="fileUpload">
				<div
					className="dd-area"
					ref={areaRef}
					onDragOver={onDragOverHandlerRef.current}
					onDragLeave={onDragLeaveHandlerRef.current}
					onDrop={onDropHandlerRef.current}
					style={{ borderStyle: dragging ? "solid" : "dashed" }}
				>
					<UploadIcon width="50px" height="50px" fill="#cacaca" />
					<span>Click or drag to upload</span>
				</div>
			</label>
		</div>
	);
}
