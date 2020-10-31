import * as React from "react";
import { CollectionSet } from "../../../store/state";
import AddElementButton from "../AddElementButton";
import { EditIcon } from "../icons";
import "./style.less";

interface Props {
	collections: CollectionSet;
	isEditMode: boolean;
	onCollectionUse?(collectionID: string): void;
	onCollectionEdit?(collectionID: string): void;
}

export default function CollectionsView(props: Props) {
	const collectionEditClickHandler = React.useCallback((collectionId) => {
		const hasResolutions = Object.keys(props.collections[collectionId].resolutions).length;

		if (hasResolutions && !props.isEditMode) {
			props.onCollectionUse(collectionId);
		} else {
			props.onCollectionEdit(collectionId);
		}
	}, [props.collections, props.isEditMode]);

	const collectionsElements = Object.entries(props.collections).map(([collID, collection], index) => {
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
					<div className="empty-slot">
						<span className="fade-blink" title="Add pictures to this collection to see something">Empty Slot</span>
					</div>
				</>
			);
		}

		return (
			<div className="collection" key={`${collection.name}-collection${index}`}>
				<div className="preview" onClick={() => collectionEditClickHandler(collID)}>
					{previewContent}
					<div className={`edit-icon ${props.isEditMode && "showable" || ""}`}>
						<EditIcon />
					</div>
				</div>
				<span>{resolutionsIDs.length && collection.name || "no-name"}</span>
			</div>
		);
	});

	return (
		<div id="grid" className="collection-view">
			{collectionsElements}
			<div className="collection">
				<AddElementButton
					caption="Add collection"
					onClick={() => { }}
				/>
			</div>
		</div>
	);
}
