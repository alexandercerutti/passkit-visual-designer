import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { MoreFieldsBelowIcon } from "../icons";
import DrawerElement from "../DrawerElement";

interface Props {
	readonly fieldsData: Pass.PassFieldContent[];
	onFieldDelete(fieldUUID: string): void;
	onFieldOrderChange(fieldUUID: string, of: number): void;
	openDetailsPage(fieldUUID: string): void;
}

export default function Drawer(props: Props) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const drawerRef = React.useRef<HTMLDivElement>();

	const onListScrollHandler = React.useCallback(
		({ currentTarget }: Partial<React.UIEvent<HTMLDivElement>>) => {
			// Tollerance of 25px before showing the indicator
			const didReachEndOfScroll =
				currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.clientHeight + 25;
			// We want to hide "more" icon if we reached end of the scroll
			setMoreAvailability(!didReachEndOfScroll);
		},
		[]
	);

	React.useEffect(() => {
		const { current: currentTarget } = drawerRef;

		if (props.fieldsData.length) {
			onListScrollHandler({ currentTarget });
		}
	}, [props.fieldsData]);

	const panels = props.fieldsData.map((field, index) => {
		return (
			<DrawerElement
				key={`dre-${index}`}
				elementData={field}
				onFieldDelete={props.onFieldDelete}
				onFieldOrderChange={props.onFieldOrderChange}
				isUpperBoundary={index === 0}
				isLowerBoundary={index === props.fieldsData.length - 1}
				openDetailsPage={props.openDetailsPage}
			/>
		);
	});

	return (
		<>
			<div id="drawer" ref={drawerRef} onScroll={onListScrollHandler}>
				{panels}
			</div>
			<div className="more-items-indicator" style={{ opacity: Number(isThereMoreAfterTheSkyline) }}>
				<MoreFieldsBelowIcon />
			</div>
		</>
	);
}
