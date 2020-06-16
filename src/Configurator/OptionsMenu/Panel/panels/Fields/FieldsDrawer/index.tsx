import * as React from "react";
import { FieldProps } from "../../../../../../passes/Areas/components/Field";
import { MoreFieldsBelowIcon } from "../icons";
import FieldsDrawerElement from "./FieldsDrawerElement";

interface FieldsDrawerProps {
	fieldsData: FieldProps[];
	onFieldDelete(fieldKey: string): void;
	onFieldOrderChange(fromIndex: number, of: number): void;
}

export default function FieldsDrawer(props: FieldsDrawerProps) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const drawerRef = React.useRef<HTMLDivElement>();

	const onListScrollHandler = React.useRef(({ currentTarget }: Partial<React.UIEvent<HTMLDivElement>>) => {
		// Tollerance of 50px before showing the indicator
		const didReachEndOfScroll = (
			currentTarget.scrollHeight - currentTarget.scrollTop <= currentTarget.clientHeight + 25
		);
		// We want to hide "more" icon if we reached end of the scroll
		setMoreAvailability(!didReachEndOfScroll);
	});

	React.useEffect(() => {
		const { current: fieldList } = drawerRef;
		const [header] = Array.from(fieldList.parentNode.children) as HTMLDivElement[];

		if (props.fieldsData.length) {
			onListScrollHandler.current({ currentTarget: fieldList });
		}
	}, [props.fieldsData]);

	const panels = props.fieldsData.map((field, index) => (
		<FieldsDrawerElement
			key={field.fieldKey}
			fieldKey={field.fieldKey}
			onFieldDelete={props.onFieldDelete}
			onFieldOrderChange={props.onFieldOrderChange}
			index={index}
			isUpperBoundary={index === 0}
			isLowerBoundary={index === props.fieldsData.length - 1}
		/>
	));

	return (
		<>
			<div
				className="fields"
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
