import * as React from "react";
import { FieldProps } from "../../../../../../passes/Areas/components/Field";
import { FieldsDrawerElement } from "./FieldsDrawerElement";
import { MoreFieldsBelowIcon } from "../icons";

interface FieldsDrawerProps {
	fieldsData: FieldProps[];
	onFieldDelete(fieldKey: string): void;
}

export default function FieldsDrawer(props: FieldsDrawerProps) {
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const listRef = React.useRef<HTMLDivElement>();

	const onListScrollHandler = React.useRef(() => {
		const didReachEndOfScroll = (
			listRef.current.scrollHeight - listRef.current.scrollTop === listRef.current.clientHeight
		);
		// We want to hide "more" icon if we reached end of the scroll
		setMoreAvailability(!didReachEndOfScroll);
	});

	React.useEffect(() => {
		const { current: fieldList } = listRef;
		const { children } = listRef.current.parentNode;
		const [header] = Array.from(children) as HTMLDivElement[];

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
			<div className="fields" ref={listRef} onScroll={onListScrollHandler.current}>
				{panels}
			</div>
			<div className="more-items-indicator" style={{ opacity: Number(isThereMoreAfterTheSkyline) }}>
				<MoreFieldsBelowIcon />
			</div>
		</>
	);
}
