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
	const collectionsElements = props.collections?.map((coll) => (
		<div className="collection" key={coll.name} onClick={props.selectCollection}>
			<div className="preview">
				<img src={coll.srcset[0] || ""} />
				<img src={coll.srcset[1] || coll.srcset[coll.srcset.length - 1]} />
				<img src={coll.srcset[2] || coll.srcset[coll.srcset.length - 1]} />
			</div>
			<span>{coll.name}</span>
		</div>
	));

	const amountOfRows = Math.ceil((props.collections.length + 1) / 3);

	return (
		<div id="collection-view" style={{ gridTemplateRows: `repeat(${amountOfRows}, 1fr)` }}>
			{collectionsElements}
			<div className="collection">
				<div className="create-new" />
				<span>Add Collection</span>
			</div>
		</div>
	);
}
