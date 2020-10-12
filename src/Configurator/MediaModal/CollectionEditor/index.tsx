import * as React from "react";
import { Collection } from "..";
import AddElementButton from "../AddElementButton";
import DynamicGrid from "../DynamicGrid";
import "./style.less";

interface Props {
	collection: Collection;
	onBack(): void;
	onCollectionChange(): void;
}

export default function CollectionEditor(props: Props) {
	const collectionItems = props.collection.srcset.map((url, index) => {
		return (
			<div className="item" key={`${url}-${index}`}>
				<div className="preview">
					<img src={url} />
				</div>
			</div>
		);
	});

	return (
		<DynamicGrid
			elementsAmount={props.collection.srcset?.length ?? 0}
			wrapLimit={3}
			className="collection-editor"
		>
			{collectionItems}
			<div className="item">
				<AddElementButton
					caption="Add picture"
					onClick={() => void 0}
				/>
			</div>
		</DynamicGrid>
	);
}
