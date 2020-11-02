import * as React from "react";
import { v1 as uuid } from "uuid";
import { IdentifiedResolutions, MediaCollection, ResolutionTuple } from "../../../store/state";
import AddElementButton from "../AddElementButton";
import "./style.less";

interface Props {
	collectionID: string;
	collection: MediaCollection;
	onResolutionChange(collectionID: string, resolutions: IdentifiedResolutions, editHints: number): void;
}

export default function CollectionEditor(props: Props) {
	const [draggingOver, setDraggingOver] = React.useState(false);

	const onDragEnterHandlerRef = React.useCallback((event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);

		if (!draggingOver) {
			setDraggingOver(true);
		}
	}, [draggingOver]);

	const onDragLeaveHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);
		setDraggingOver(false);
	});

	const onDropHandlerRef = React.useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);
		setDraggingOver(false);

		const newResolutions = await getResolutionsFromFileList(event.dataTransfer.files);

		props.onResolutionChange(props.collectionID, {
			...props.collection.resolutions,
			...newResolutions,
		}, 0b0010);
	}, [props.collection]);

	const onChangeHandlerRef = React.useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newResolutions = await getResolutionsFromFileList(event.target.files);

		props.onResolutionChange(props.collectionID, {
			...props.collection.resolutions,
			...newResolutions,
		}, 0b0010);
	}, [props.collection]);

	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		if (key === "Enter") {
			currentTarget.blur();
		}
	});

	const onBlurEventRef = React.useCallback((resolutionID: string, resolutionNewName: string) => {
		/**
		 * Only resolution name changed. We use 0b0010 as editHint
		 */

		const { resolutions: currentResolutions } = props.collection;

		if (currentResolutions[resolutionID].name === resolutionNewName) {
			return;
		}

		props.onResolutionChange(props.collectionID, {
			...currentResolutions,
			[resolutionID]: {
				name: resolutionNewName,
				content: currentResolutions[resolutionID].content
			}
		}, 0b0010);
	}, [props.collection]);

	const collectionItems = Object.entries(props.collection.resolutions)
		.map(([resolutionID, resolution], index) => {
			const url = resolution.content[1];

			return (
				<div className="item" key={`${url}-${index}`}>
					<div className="clipper">
						<img src={url} />
					</div>
					<input
						type="text"
						onKeyDown={onKeyDownEventRef.current}
						onBlur={({ currentTarget }: React.FocusEvent<HTMLInputElement>) => onBlurEventRef(resolutionID, currentTarget.value)}
						defaultValue={props.collection.name}
					/>
				</div>
			);
		});

	return (
		<>
			<div
				id="grid"
				className={`collection-editor ${draggingOver && "dragOver" || ""}`}
				onDragEnter={onDragEnterHandlerRef}
				// To avoid for children pictures to be dragged and trigger the onDragEnter
				onDragStart={preventPropagation}
			>
				{collectionItems}
				<div className="item">
					<input type="file" id="file-upload" hidden onChange={onChangeHandlerRef} />
					<label htmlFor="file-upload">
						<AddElementButton
							caption="Add picture"
							onClick={() => void 0}
						/>
					</label>
				</div>
			</div>
			<div
				id="drop-area"
				onDragOver={preventPropagation}
				onDragLeave={onDragLeaveHandlerRef.current}
				onDrop={onDropHandlerRef}
			>
				<span>Drop to add to collection</span>
			</div>
		</>
	);
}

function preventPropagation(e: React.SyntheticEvent) {
	e.preventDefault();
	e.stopPropagation();
}

async function getResolutionsFromFileList(files: FileList) {
	const buffers = await Promise.all<ArrayBuffer>(
		Array.prototype.map.call(files, (fileObj: File) =>
			fileObj.arrayBuffer()
		)
	);

	return buffers.reduce((acc, buffer) => {
		return {
			...acc,
			[uuid()]: {
				name: "",
				content: [buffer, null] as ResolutionTuple
			}
		}
	}, {} as IdentifiedResolutions);
}
