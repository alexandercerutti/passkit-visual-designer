import * as React from "react";
import { IdentifiedResolutions, MediaCollection } from "../../../store/state";
import AddElementButton from "../AddElementButton";
import "./style.less";

interface Props {
	collectionID: string;
	collection: MediaCollection;
	onResolutionChange(collectionID: string, resolutions: IdentifiedResolutions, editHints: number): void;
}

export default function CollectionEditor(props: Props) {
	const [draggingOver, setDraggingOver] = React.useState(false);

	const onDragEnterHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);

		if (!draggingOver) {
			setDraggingOver(true);
		}
	});

	const onDragLeaveHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);
		setDraggingOver(false)
	});

	const onDropHandlerRef = React.useRef((event: React.DragEvent<HTMLDivElement>) => {
		preventPropagation(event);
		console.log("Dragging done", event.dataTransfer.files);

		setDraggingOver(false);
		// props.onFilesUploaded(event.dataTransfer.files);
	});

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
				onDragEnter={onDragEnterHandlerRef.current}
				// To avoid for children pictures to be dragged and trigger the onDragEnter
				onDragStart={preventPropagation}
			>
				{collectionItems}
				<div className="item">
					<AddElementButton
						caption="Add picture"
						onClick={() => void 0}
					/>
				</div>
			</div>
			<div
				id="drop-area"
				onDragOver={preventPropagation}
				onDragLeave={onDragLeaveHandlerRef.current}
				onDrop={onDropHandlerRef.current}
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
