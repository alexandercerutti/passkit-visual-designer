import * as React from "react";
import "./style.less";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { MoreFieldsBelowIcon } from "../icons";
import FieldsDrawerElement from "../FieldsDrawerElement";
import PageNavigationContext from "../../PageNavigationContext";

interface Props {
	fieldsData: (FieldProps & { fieldUUID: string })[];
	onFieldDelete(fieldUUID: string): void;
	onFieldChange(fieldUUID: string, data: FieldProps): void;
	onFieldOrderChange(fromIndex: number, of: number): void;
}

export default function Drawer(props: Props) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const drawerRef = React.useRef<HTMLDivElement>();

	const onListScrollHandler = React.useRef(({ currentTarget }: Partial<React.UIEvent<HTMLDivElement>>) => {
		// Tollerance of 25px before showing the indicator
		const didReachEndOfScroll = (
			currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.clientHeight + 25
		);
		// We want to hide "more" icon if we reached end of the scroll
		setMoreAvailability(!didReachEndOfScroll);
	});

	React.useEffect(() => {
		const { current: currentTarget } = drawerRef;

		if (props.fieldsData.length) {
			onListScrollHandler.current({ currentTarget });
		}
	}, [props.fieldsData]);

	const panels = props.fieldsData.map((field, index) => {
		const { fieldUUID, ...fieldProps } = field;

		return (
			<PageNavigationContext.Consumer key={fieldUUID}>
				{({ requestPageCreation }) => (
					<FieldsDrawerElement
						fieldUUID={fieldUUID}
						elementData={fieldProps}
						onFieldDelete={props.onFieldDelete}
						onFieldDataChange={props.onFieldChange}
						onFieldOrderChange={(amount) => props.onFieldOrderChange(index, amount)}
						requestPageCreation={requestPageCreation}
						isUpperBoundary={index === 0}
						isLowerBoundary={index === props.fieldsData.length - 1}
					/>
				)}
			</PageNavigationContext.Consumer>
		)
	});

	return (
		<>
			<div
				id="drawer"
				ref={drawerRef}
				onScroll={onListScrollHandler.current}
			>
				{panels}
			</div>
			<div className="more-items-indicator" style={{ opacity: Number(isThereMoreAfterTheSkyline) }}>
				<MoreFieldsBelowIcon />
			</div>
		</>
	);
}
