import * as React from "react";
import { PanelProps } from "../..";
import "./style.less";

import UploadIcon from "./uploadIcon";

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

interface UploadAreaProps {
	onFileUpload: (file: File) => void;
}

function UploadArea(props: UploadAreaProps): JSX.Element {
	const inputFileHandlerRef = React.useRef((files: FileList) => {
		console.log("Received some files to handle.", files);
		const firstFile = files[0];
		props.onFileUpload(firstFile);
	});

	const onChangeHandlerRef = React.useRef((event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		event.stopPropagation();

		inputFileHandlerRef.current(event.target.files);
	});

	return (
		<>
			<input type="file" id="fileUpload" hidden onChange={onChangeHandlerRef.current} />
			<label htmlFor="fileUpload">
				<DragAndDropArea onFilesUploaded={inputFileHandlerRef.current} />
			</label>
		</>
	);
}

interface DnDProps {
	onFilesUploaded: (files: FileList) => void;
}

function DragAndDropArea(props: DnDProps): JSX.Element {
	const [dragging, setDragging] = React.useState(false);

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
		props.onFilesUploaded(event.dataTransfer.files);
	});

	return (
		<div
			className="dd-area"
			onDragOver={onDragOverHandlerRef.current}
			onDragLeave={onDragLeaveHandlerRef.current}
			onDrop={onDropHandlerRef.current}
			style={{ borderStyle: dragging ? "solid" : "dashed" }}
		>
			<UploadIcon width="50px" height="50px" fill="#cacaca" />
			<span>Click or drag to upload</span>
		</div>
	);
}
