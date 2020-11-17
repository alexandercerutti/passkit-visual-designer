import * as React from "react";
import { v1 as uuid } from "uuid";
import { CollectionEditModify, CollectionEditOperation } from "..";
import { IdentifiedResolutions, MediaCollection, ResolutionTuple } from "../../../store/state";
import { getArrayBuffer } from "../../../utils";
import { DeleteIcon, PlusIcon } from "../icons";
import "./style.less";

interface Props {
	collectionID: string;
	collection: MediaCollection;
	onResolutionChange(operation: CollectionEditOperation, collectionID: string, collection: MediaCollection): void;
}

interface State {
	draggingOver: boolean;
}

export default class CollectionEditor extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			draggingOver: false,
		};

		this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
		this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
		this.onResolutionsEdit = this.onResolutionsEdit.bind(this);
		this.onResolutionDelete = this.onResolutionDelete.bind(this);
		this.onDropHandler = this.onDropHandler.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
		this.onBlurHandler = this.onBlurHandler.bind(this);
		this.updateResolutionsFromFiles = this.updateResolutionsFromFiles.bind(this);
	}

	static preventEventDefaultPropagation(event: React.SyntheticEvent) {
		event.preventDefault();
		event.stopPropagation();
	}

	// ************************************* //
	// *** DRAG AND DROP, UPLOAD METHODS *** //
	// ************************************* //

	onDragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
		CollectionEditor.preventEventDefaultPropagation(event);

		if (!this.state.draggingOver) {
			this.setState({
				draggingOver: true
			});
		}
	}

	onDragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
		CollectionEditor.preventEventDefaultPropagation(event);

		this.setState({
			draggingOver: false
		});
	}

	async onDropHandler(event: React.DragEvent<HTMLDivElement>) {
		CollectionEditor.preventEventDefaultPropagation(event);

		this.setState({
			draggingOver: false
		});

		this.updateResolutionsFromFiles(event.dataTransfer.files);
	}

	async onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		// @TODO Remove once React 17 will be integrated
		event.persist();

		await this.updateResolutionsFromFiles(event.target.files);
		event.target.value = "";
	}

	async updateResolutionsFromFiles(files: FileList) {
		const newResolutions = await getResolutionsFromFileList(files);

		const { collection } = this.props;

		this.onResolutionsEdit({
			...collection.resolutions,
			...newResolutions
		});
	}

	onResolutionDelete(resolutionID: string) {
		const { collection } = this.props;

		this.onResolutionsEdit({
			...collection.resolutions,
			[resolutionID]: null
		});
	}

	onResolutionsEdit(resolutions: IdentifiedResolutions) {
		const { onResolutionChange, collection, collectionID } = this.props;

		const changedCollection: MediaCollection = {
			name: collection.name,
			resolutions,
		};

		onResolutionChange(CollectionEditModify, collectionID, changedCollection);
	}

	// **************************** //
	// *** INPUT EVENT HANDLERS *** //
	// **************************** //

	onKeyDownHandler({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) {
		if (key === "Enter") {
			currentTarget.blur();
		}
	}

	onBlurHandler(resolutionID: string, resolutionNewName: string) {
		const { resolutions: currentResolutions } = this.props.collection;

		if (currentResolutions[resolutionID].name === resolutionNewName) {
			return;
		}

		this.onResolutionsEdit({
			...currentResolutions,
			[resolutionID]: {
				name: resolutionNewName,
				content: currentResolutions[resolutionID].content
			}
		});
	}

	render() {
		const { collection } = this.props;

		const collectionItems = Object.entries(collection.resolutions)
			.map(([resolutionID, resolution], index) => {
				const url = resolution.content[1];

				return (
					<div className="resolution" key={`${url}-${index}`}>
						<div className="item">
							<div className="item-actions">
								<DeleteIcon onClick={() => this.onResolutionDelete(resolutionID)} />
							</div>
							<div className="clipper">
								<img src={url} />
							</div>
						</div>
						<input
							type="text"
							onKeyDown={this.onKeyDownHandler}
							onBlur={({ currentTarget }: React.FocusEvent<HTMLInputElement>) => this.onBlurHandler(resolutionID, currentTarget.value)}
							defaultValue={resolution.name}
						/>
					</div>
				);
			});

		return (
			<>
				<div
					id="grid"
					className={`collection-editor ${this.state.draggingOver && "dragOver" || ""}`}
					onDragEnter={this.onDragEnterHandler}
					// To avoid for children pictures to be dragged and trigger the onDragEnter
					onDragStart={CollectionEditor.preventEventDefaultPropagation}
				>
					{collectionItems}
					<div className="resolution">
						<label className="item add-resolution" htmlFor="file-upload">
							<input type="file" id="file-upload" hidden onChange={this.onChangeHandler} />
							<div>
								<PlusIcon />
							</div>
						</label>
						<span>Add resolution</span>
					</div>
				</div>
				<div
					id="drop-area"
					onDragOver={CollectionEditor.preventEventDefaultPropagation}
					onDragLeave={this.onDragLeaveHandler}
					onDrop={this.onDropHandler}
				>
					<span>Drop to add to collection</span>
				</div>
			</>
		);
	}
}

async function getResolutionsFromFileList(files: FileList) {
	const buffers = await Promise.all<ArrayBuffer>(
		Array.prototype.map.call(files, getArrayBuffer)
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
