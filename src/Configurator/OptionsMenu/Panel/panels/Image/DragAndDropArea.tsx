import * as React from "react";
import UploadIcon from "./uploadIcon";

interface DnDProps {
	onFilesUploaded: (files: FileList) => void;
}

export default function DragAndDropArea(props: DnDProps): JSX.Element {
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
