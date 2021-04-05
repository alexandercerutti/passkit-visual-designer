import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { MoreFieldsBelowIcon } from "../icons";
import DrawerElement from "../DrawerElement";
import PageNavigationContext from "../../PageNavigationContext";

type PassFieldKeys = Constants.PassFieldKeys;

interface Props {
	readonly fieldsData: PassFieldKeys[];
	readonly fieldsUUIDs: string[];
	onFieldDelete(fieldUUID: string): void;
	onFieldChange(fieldUUID: string, data: PassFieldKeys): void;
	onFieldOrderChange(fieldUUID: string, of: number): void;
}

export default function Drawer(props: Props) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const drawerRef = React.useRef<HTMLDivElement>();

	const { requestPageCreation } = React.useContext(PageNavigationContext);

	const onListScrollHandler = React.useRef(
		({ currentTarget }: Partial<React.UIEvent<HTMLDivElement>>) => {
			// Tollerance of 25px before showing the indicator
			const didReachEndOfScroll =
				currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.clientHeight + 25;
			// We want to hide "more" icon if we reached end of the scroll
			setMoreAvailability(!didReachEndOfScroll);
		}
	);

	React.useEffect(() => {
		const { current: currentTarget } = drawerRef;

		if (props.fieldsData.length) {
			onListScrollHandler.current({ currentTarget });
		}
	}, [props.fieldsData]);

	const panels = props.fieldsData.map((field, index) => {
		const fieldUUID = props.fieldsUUIDs[index];

		return (
			<DrawerElement
				key={fieldUUID}
				fieldUUID={fieldUUID}
				elementData={field}
				onFieldDelete={props.onFieldDelete}
				onFieldDataChange={props.onFieldChange}
				onFieldOrderChange={props.onFieldOrderChange}
				requestPageCreation={requestPageCreation}
				isUpperBoundary={index === 0}
				isLowerBoundary={index === props.fieldsData.length - 1}
			/>
		);
	});

	return (
		<>
			<div id="drawer" ref={drawerRef} onScroll={onListScrollHandler.current}>
				{panels}
			</div>
			<div className="more-items-indicator" style={{ opacity: Number(isThereMoreAfterTheSkyline) }}>
				<MoreFieldsBelowIcon />
			</div>
		</>
	);
}
