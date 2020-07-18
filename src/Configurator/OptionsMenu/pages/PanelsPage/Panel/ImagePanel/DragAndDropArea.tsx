import * as React from "react";
import { UploadIcon } from "./icons";
import { createClassName } from "../../../../../../utils";

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

	const className = createClassName(["dd-area"], {
		"drag-active": dragging
	});

	return (
		<div
			className={className}
			onDragOver={onDragOverHandlerRef.current}
			onDragLeave={onDragLeaveHandlerRef.current}
			onDrop={onDropHandlerRef.current}
		>
			<UploadIcon width="50px" height="50px" fill="#cacaca" />
			<span>Click or drag to upload</span>
		</div>
	);
}
