import * as React from "react";
import { v1 as uuid } from "uuid";
import type { IdentifiedResolutions, MediaCollection } from "@pkvd/store";
import { getArrayBuffer } from "../../../utils";
import { DeleteIcon, PlusIcon } from "../icons";
import "./style.less";

const NAME_RESOLUTION_REGEX = /@(\dx)\..+$/;

interface Props {
	collection: MediaCollection;
	onCollectionChange(collection: MediaCollection): void;
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
		this.onResolutionNameCommit = this.onResolutionNameCommit.bind(this);
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
				draggingOver: true,
			});
		}
	}

	onDragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
		CollectionEditor.preventEventDefaultPropagation(event);

		this.setState({
			draggingOver: false,
		});
	}

	async onDropHandler(event: React.DragEvent<HTMLDivElement>) {
		CollectionEditor.preventEventDefaultPropagation(event);

		this.setState({
			draggingOver: false,
		});

		this.updateResolutionsFromFiles(event.dataTransfer.files);
	}

	async onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
		await this.updateResolutionsFromFiles(event.target.files);
		event.target.value = "";
	}

	async updateResolutionsFromFiles(files: FileList) {
		const newResolutions = await getResolutionsFromFileList(files);

		const { collection } = this.props;

		this.onResolutionsEdit({
			...collection.resolutions,
			...newResolutions,
		});
	}

	onResolutionDelete(resolutionID: string) {
		const { collection } = this.props;

		this.onResolutionsEdit({
			...collection.resolutions,
			[resolutionID]: null,
		});
	}

	onResolutionsEdit(resolutions: IdentifiedResolutions) {
		const { onCollectionChange, collection } = this.props;

		const changedCollection: MediaCollection = {
			name: collection.name,
			resolutions,
		};

		onCollectionChange(changedCollection);
	}

	// **************************** //
	// *** INPUT EVENT HANDLERS *** //
	// **************************** //

	onResolutionNameCommit(resolutionID: string, resolutionNewName: string) {
		const { resolutions: currentResolutions } = this.props.collection;

		if (currentResolutions[resolutionID].name === resolutionNewName) {
			return;
		}

		this.onResolutionsEdit({
			...currentResolutions,
			[resolutionID]: {
				name: resolutionNewName,
				content: currentResolutions[resolutionID].content,
			},
		});
	}

	render() {
		const { collection } = this.props;

		const collectionItems = Object.entries(collection.resolutions).map(
			([resolutionID, resolution], index) => {
				/**
				 * @TODO For the sake of a good architecture, this
				 * component should receive a mapped structure with URLs
				 * to render instead of querying sessionStorage itself.
				 */
				const url = sessionStorage.getItem(resolutionID);

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
						<select
							onChange={(event) =>
								this.onResolutionNameCommit(
									resolutionID,
									event.currentTarget.selectedOptions[0].value
								)
							}
							defaultValue={`@${resolution.name}`}
						>
							<option value="@1x">1x</option>
							<option value="@2x">2x</option>
							<option value="@3x">3x</option>
						</select>
					</div>
				);
			}
		);

		return (
			<div
				className={`list collection-editor ${(this.state.draggingOver && "dragOver") || ""}`}
				onDragEnter={this.onDragEnterHandler}
				// To avoid for children pictures to be dragged and trigger the onDragEnter
				onDragStart={CollectionEditor.preventEventDefaultPropagation}
			>
				<div id="grid">
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
				<footer>
					<span>Hint: add a new resolution to collection by drag and drop</span>
				</footer>
				<div
					id="drop-area"
					onDragOver={CollectionEditor.preventEventDefaultPropagation}
					onDragLeave={this.onDragLeaveHandler}
					onDrop={this.onDropHandler}
				>
					<span>Drop to add to collection</span>
				</div>
			</div>
		);
	}
}

async function getResolutionsFromFileList(files: FileList) {
	const buffers = await Promise.all<ArrayBuffer>(Array.prototype.map.call(files, getArrayBuffer));

	return buffers.reduce((acc, content, index) => {
		return {
			...acc,
			[uuid()]: {
				name: files[index].name.match(NAME_RESOLUTION_REGEX)?.[1] ?? "1x",
				content,
			},
		};
	}, {} as IdentifiedResolutions);
}
