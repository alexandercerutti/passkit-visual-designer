import * as React from "react";
import DragAndDropArea from "./DragAndDropArea";

interface UploadAreaProps {
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

	return (
		<>
			<input type="file" id="fileUpload" hidden onChange={onChangeHandlerRef.current} />
			<label htmlFor="fileUpload">
				<DragAndDropArea onFilesUploaded={inputFileHandlerRef.current} />
			</label>
		</>
	);
}
