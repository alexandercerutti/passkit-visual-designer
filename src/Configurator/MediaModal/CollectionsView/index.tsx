import * as React from "react";
import { Collection } from "..";
import DynamicGrid from "../DynamicGrid";
import { PlusIcon, EditIcon } from "../icons";
import "./style.less";

interface Props {
	collections: Collection[];
	onCollectionUse?(name: string): void;
	onCollectionEdit?(name: string): void;
}

export default function CollectionsView(props: Props) {
	const collectionsElements = props.collections?.map((coll, index) => {
		let previewContent: React.ReactFragment;

		if (coll.srcset.length) {
			const trimmedSet = coll.srcset.slice(0, 3);
			const fallbackElement = trimmedSet[trimmedSet.length - 1];
			const previewSet = Array<string>(3).fill(undefined);
			previewSet.splice(0, Math.min(3, coll.srcset.length), ...trimmedSet);

			const clippers = previewSet.map((url, index) => {
				const src = url || fallbackElement;
				return (
					<div className="clipper" key={`${coll.name}-clipper${index}`}>
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
			<div className="collection" key={`${coll.name}-collection${index}`}>
				<div className="preview" onClick={() => props[coll.srcset.length ? "onCollectionUse" : "onCollectionEdit"](coll.name || "")}>
					{previewContent}
				</div>
				<span>
					{coll.srcset.length && coll.name || "no-name"}
					<EditIcon onClick={() => props.onCollectionEdit?.(coll.name)} />
				</span>
			</div>
		)
	});

	return (
		<DynamicGrid
			elementsAmount={collectionsElements.length}
			className="collection-view"
			wrapLimit={3}
		>
			{collectionsElements}
			<div className="collection">
				<div className="create-new">
					<PlusIcon />
				</div>
				<span>Add collection</span>
			</div>
		</DynamicGrid>
	);
}
