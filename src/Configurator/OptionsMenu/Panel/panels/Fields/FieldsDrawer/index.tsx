import * as React from "react";
import { FieldProps } from "../../../../../../passes/Areas/components/Field";
import { MoreFieldsBelowIcon } from "../icons";
import FieldsDrawerElement from "./FieldsDrawerElement";

interface FieldsDrawerProps {
	fieldsData: FieldProps[];
	onFieldDelete(fieldKey: string): void;
}

export default function FieldsDrawer(props: FieldsDrawerProps) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const drawerRef = React.useRef<HTMLDivElement>();

	const onListScrollHandler = React.useRef(() => {
		const didReachEndOfScroll = (
			drawerRef.current.scrollHeight - drawerRef.current.scrollTop === drawerRef.current.clientHeight
		);
		// We want to hide "more" icon if we reached end of the scroll
		setMoreAvailability(!didReachEndOfScroll);
	});

	React.useEffect(() => {
		const { current: fieldList } = drawerRef;
		const [header] = Array.from(fieldList.parentNode.children) as HTMLDivElement[];

		if (props.fieldsData.length) {
			setMoreAvailability((header.offsetHeight + fieldList.scrollHeight) > window.innerHeight);
		}
	}, [props.fieldsData]);

	const panels = props.fieldsData.map((field, index) => (
		<FieldsDrawerElement
			key={field.fieldKey}
			fieldKey={field.fieldKey}
			onFieldDelete={props.onFieldDelete}
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
