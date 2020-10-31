import * as React from "react";
import { IdentifiedResolutions, MediaCollection } from "../../../store/state";
import AddElementButton from "../AddElementButton";
import "./style.less";

interface Props {
	collectionID: string;
	collection: MediaCollection;
	onResolutionChange(collectionID: string, resolutions: IdentifiedResolutions, editHints: number): void;
}

export default function CollectionEditor(props: Props) {
	const onKeyDownEventRef = React.useRef(({ key, currentTarget }: React.KeyboardEvent<HTMLInputElement>) => {
		if (key === "Enter") {
			currentTarget.blur();
		}
	});

	const onBlurEventRef = React.useCallback((resolutionID: string, resolutionNewName: string) => {
		/**
		 * Only resolution name changed. We use 0b0001 as editHint
		 */

		const { resolutions: currentResolutions } = props.collection;

		props.onResolutionChange(props.collectionID, {
			...currentResolutions,
			[resolutionID]: {
				name: resolutionNewName,
				content: currentResolutions[resolutionID].content
			}
		}, 0b0010);
	}, [props.collection]);

	const collectionItems = Object.entries(props.collection.resolutions)
		.map(([resolutionID, resolution], index) => {
			const url = resolution.content[1];

			return (
				<div className="item" key={`${url}-${index}`}>
					<div className="clipper">
						<img src={url} />
					</div>
					<input
						type="text"
						onKeyDown={onKeyDownEventRef.current}
						onBlur={({ currentTarget }: React.FocusEvent<HTMLInputElement>) => onBlurEventRef(resolutionID, currentTarget.value)}
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
