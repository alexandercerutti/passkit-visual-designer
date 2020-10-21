import * as React from "react";
import { Collection } from "..";
import AddElementButton from "../AddElementButton";
import "./style.less";

interface Props {
	collection: Collection;
	onBack(): void;
	onCollectionChange(collection: Collection): void;
}

export default function CollectionEditor(props: Props) {
	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		if (key === "Enter") {
			currentTarget.blur();
		}
	});

	const onBlurEventRef = React.useRef(({ currentTarget }: React.FocusEvent<HTMLInputElement>) => {
		props.onCollectionChange({ name: currentTarget.value, srcset: [] });
	});

	const collectionItems = props.collection.srcset.map((url, index) => {
		return (
			<div className="item" key={`${url}-${index}`}>
				<div className="clipper">
					<img src={url} />
				</div>
				<input
					type="text"
					onKeyDown={onKeyDownEventRef.current}
					onBlur={onBlurEventRef.current}
					defaultValue={props.collection.name}
				/>
			</div>
		);
	});

	return (
		<div id="grid" className="collection-editor">
			{collectionItems}
			<div className="item">
				<AddElementButton
					caption="Add picture"
					onClick={() => void 0}
				/>
			</div>
		</div>
	);
}
