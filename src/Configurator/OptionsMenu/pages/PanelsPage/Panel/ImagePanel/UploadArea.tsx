import * as React from "react";
import DragAndDropArea from "./DragAndDropArea";

interface UploadAreaProps {
	areaIdentifier: string;
	onFileUpload: (file: File) => void;
}

export default function UploadArea(props: UploadAreaProps): JSX.Element {
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

	const id = `fileUpload-${props.areaIdentifier}`;

	return (
		<>
			<input type="file" id={id} hidden onChange={onChangeHandlerRef.current} />
			<label htmlFor={id}>
				<DragAndDropArea onFilesUploaded={inputFileHandlerRef.current} />
			</label>
		</>
	);
}
