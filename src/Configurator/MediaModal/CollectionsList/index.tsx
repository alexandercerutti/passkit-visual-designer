import * as React from "react";
import "./style.less";
import type { CollectionSet } from "../../../store";
import { DeleteIcon, EditIcon, PlusIcon } from "../icons";
import type { CollectionEditOperation } from "..";
import { CollectionEditCreate, CollectionEditDelete } from "..";
import { createClassName } from "../../../utils";
import { Switcher } from "../../Switcher";

interface Props {
	media: CollectionSet;
	isEditMode: boolean;
	currentLanguage: string;
	useSelectedCollection(collectionID: string): void;
	editSelectedCollection(collectionID: string): void;
	setMediaExportState(enabled: boolean): void;
	performCollectionsOperation(operation: CollectionEditOperation, collectionID?: string): void;
	requestForLanguageChange(): void;
}

export default function CollectionsList(props: Props) {
	const collectionsClassName = createClassName(["collection-actions"], {
		"edit-mode-active": props.isEditMode
	});

	const collectionEditClickHandler = React.useCallback((collectionId) => {
		props.editSelectedCollection(collectionId);
	}, [props.media]);

	const collectionDeleteClickHandler = React.useCallback((collectionID) => {
		props.performCollectionsOperation(CollectionEditDelete, collectionID);
	}, [props.media]);

	const collectionAddClickHandler = React.useCallback(() => {
		props.performCollectionsOperation(CollectionEditCreate);
	}, [props.media]);

	const collectionsElements = !props.media?.collections ? null : Object.entries(props.media?.collections)
		.map(([collID, collection], index) => {
			let previewContent: React.ReactFragment;
			const resolutionsIDs = Object.keys(collection.resolutions);

			if (resolutionsIDs.length) {
				const trimmedSet = resolutionsIDs.slice(0, 3);
				const fallbackElementURL = sessionStorage.getItem(trimmedSet[trimmedSet.length - 1]);

				/**
				 * Creating a sized array of resolutions.
				 * splicing from 0 to resolutions amount to not
				 * remove undefined unused spaces.
				 */

				const previewSet = Array<string>(3).fill(undefined);
				previewSet.splice(
					0,
					Math.min(3, resolutionsIDs.length),
					...trimmedSet.map(key => sessionStorage.getItem(key))
				);

				const clippers = previewSet.map((url, index) => {
					const src = url || fallbackElementURL;
					return (
						<div className="clipper" key={`${collection.name}-clipper${index}`}>
							<img src={src} />
						</div>
					);
				});

				previewContent = (
					<>
						{clippers}
					</>
				);
			} else {
				previewContent = (
					<>
						<div>
							<span className="fade-blink" title="Edit this collection to see preview here">Empty Slot</span>
						</div>
					</>
				);
			}

			const previewClassName = createClassName(["preview"], {
				"selected": resolutionsIDs.length && props.media?.activeCollectionID === collID,
				"empty-coll": !resolutionsIDs.length
			});

			return (
				<div className="collection" key={`${collection.name}-collection${index}`}>
					<div className={previewClassName} onClick={() => resolutionsIDs.length && props.useSelectedCollection(collID)}>
						{previewContent}
						<div className={collectionsClassName} onClick={(e) => void e.stopPropagation()}>
							<EditIcon id="edit-coll" onClick={(e) => collectionEditClickHandler(collID)} />
							<DeleteIcon id="delete-coll" onClick={(e) => collectionDeleteClickHandler(collID)} />
						</div>
					</div>
					<span>{resolutionsIDs.length && collection.name || "no-name"}</span>
				</div>
			);
		});

	return (
		<div className="list collections-list">
			<div id="grid" data-disabled={!(props.media?.enabled ?? true)}>
				{collectionsElements}
				<div className="collection">
					<div className="preview add-coll" onClick={collectionAddClickHandler}>
						<div>
							<PlusIcon />
						</div>
					</div>
					<span>Add collection</span>
				</div>
			</div>
			<footer>
				<Switcher
					labelPosition="after"
					checked={props.media?.enabled ?? true}
					onToggle={props.setMediaExportState}
				>
					Export
				</Switcher>
				<span
					id="select-lang"
					onClick={props.requestForLanguageChange}
					title="Click here to switch language"
				>
					{props.currentLanguage}
				</span>
			</footer>
		</div>
	);
}
