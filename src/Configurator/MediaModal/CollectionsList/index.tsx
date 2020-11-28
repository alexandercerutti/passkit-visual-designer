import * as React from "react";
import { CollectionSet } from "../../../store/state";
import { DeleteIcon, EditIcon, PlusIcon } from "../icons";
import type { CollectionEditOperation } from "..";
import { CollectionEditCreate, CollectionEditDelete } from "..";
import "./style.less";
import { createClassName } from "../../../utils";
import { Switcher } from "../../Switcher";

interface Props {
	media: CollectionSet;
	isEditMode: boolean;
	currentLanguage: string;
	onCollectionUse(collectionID: string): void;
	onCollectionEditSelect(collectionID: string): void;
	onMediaExportStateToggle(enabled: boolean): void;
	performCollectionsOperation(operation: CollectionEditOperation, collectionID?: string): void;
	requestForLanguageChange(): void;
}

export default function CollectionsList(props: Props) {
	const collectionsClassName = createClassName(["collection-actions"], {
		"edit-mode-active": props.isEditMode
	});

	const collectionEditClickHandler = React.useCallback((collectionId) => {
		props.onCollectionEditSelect(collectionId);
	}, [props.media]);

	const collectionDeleteClickHandler = React.useCallback((collectionID) => {
		props.performCollectionsOperation(CollectionEditDelete, collectionID);
	}, [props.media]);

	const collectionAddClickHandler = React.useCallback(() => {
		props.performCollectionsOperation(CollectionEditCreate);
	}, [props.media]);

	const collectionsElements = Object.entries(props.media.collections)
		.map(([collID, collection], index) => {
			let previewContent: React.ReactFragment;
			const resolutionsIDs = Object.keys(collection.resolutions);

			if (resolutionsIDs.length) {
				const trimmedSet = resolutionsIDs.slice(0, 3);
				const fallbackElementURL = collection.resolutions[trimmedSet[trimmedSet.length - 1]].content[1];

				/**
				 * Creating a sized array of resolutions.
				 * splicing from 0 to resolutions amount to not
				 * remove undefined unused spaces.
				 */

				const previewSet = Array<string>(3).fill(undefined);
				previewSet.splice(
					0,
					Math.min(3, resolutionsIDs.length),
					...trimmedSet.map(key => collection.resolutions[key].content[1])
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
				"selected": resolutionsIDs.length && props.media.activeCollectionID === collID,
				"empty-coll": !resolutionsIDs.length
			});

			return (
				<div className="collection" key={`${collection.name}-collection${index}`}>
					<div className={previewClassName} onClick={() => resolutionsIDs.length && props.onCollectionUse(collID)}>
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
			<div id="grid" data-disabled={!props.media.enabled}>
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
					checked={props.media.enabled}
					onToggle={props.onMediaExportStateToggle}
				>
					Export
				</Switcher>
				<span onClick={props.requestForLanguageChange}>
					{props.currentLanguage}
				</span>
			</footer>
		</div>
	);
}
