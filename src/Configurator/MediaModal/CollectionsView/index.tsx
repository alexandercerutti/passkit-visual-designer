import * as React from "react";
import "./style.less";

interface Collection {
	name: string;
	srcset: string[];
}

interface Props {
	collections: Collection[];
	selectCollection?(): void;
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
			<div className="collection" key={`${coll.name}-collection${index}`} onClick={props.selectCollection}>
				<div className="preview">
					{previewContent}
				</div>
				<span>{coll.srcset.length && coll.name || ""}</span>
			</div>
		)
	});

	const amountOfRows = Math.ceil((props.collections.length + 1) / 3);

	return (
		<div id="collection-view" style={{ gridTemplateRows: `repeat(${amountOfRows}, 1fr)` }}>
			{collectionsElements}
			<div className="collection">
				<div className="create-new" />
				<span>Add collection</span>
			</div>
		</div>
	);
}
