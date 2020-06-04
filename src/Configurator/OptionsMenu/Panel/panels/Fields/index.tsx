import * as React from "react";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon, FieldsAddIcon, MoreFieldsBelowIcon } from "./icons";
import FieldTitle from "../FieldTitle";
import "./style.less";

interface FieldPanelProps extends PanelProps {
	value?: FieldProps[];
}

export default function FieldPanel(props: FieldPanelProps) {
	const { current: pageCreationClickHandler } = React.useRef(() => {
		const { requestPageClosing, requestPageCreation, ...otherProps } = props;

		requestPageCreation(
			<FieldInternalPanel
				{...otherProps}
				onBack={requestPageClosing}
			/>
		);
	});

	return (
		<>
			<div className="cta-edit" onClick={pageCreationClickHandler}>
				<div className="col-left">
					<FieldTitle name={props.name} />
					<em>{`${props.value?.length ?? 0} fields for this area`}</em>
				</div>
				<FieldsArrowIcon />
			</div>
		</>
	);
}

interface FieldInternalPanel extends Omit<FieldPanelProps, "requestPageClosing" | "requestPageCreation"> {
	onBack: () => void;
}

function FieldInternalPanel(props: FieldInternalPanel) {
	const [fields, setFields] = React.useState(props.value || []);
	const [isThereMoreAfterTheSkyline, setMoreAvailability] = React.useState(false);
	const listRef = React.useRef<HTMLDivElement>();

	const name = `${props.name.slice(0, 1).toUpperCase()}${props.name.slice(1)}`;

	const { current: newFieldClickHandler } = React.useRef((fields: FieldProps[]) => {
		setFields(fields);
	});

	React.useEffect(() => {
		const { current: fieldList } = listRef;

		fieldList.addEventListener("scroll", () => {
			const didReachEndOfScroll = (
				fieldList.scrollHeight - fieldList.scrollTop === fieldList.clientHeight
			);
			// We want to hide "more" icon if we reached end of the scroll
			setMoreAvailability(!didReachEndOfScroll);
		});
	}, []);

	React.useEffect(() => {
		const { current: fieldList } = listRef;
		const { children } = listRef.current.parentNode;
		const [header] = Array.from(children) as HTMLDivElement[];

		if (fields.length) {
			setMoreAvailability((header.offsetHeight + fieldList.scrollHeight) > window.innerHeight);
		}
	}, [fields]);

	return (
		<div className="fields-page">
			<header>
				<div className="back" onClick={props.onBack}>
					<FieldsArrowIcon />
					<span>Back</span>
				</div>
				<FieldTitle name={name} />
				<FieldsAddIcon onClick={() => newFieldClickHandler([...fields, {} as FieldProps])} />
			</header>
			<div className="fields" ref={listRef}>
				<FieldsDrawer {...props} value={fields} />
			</div>
			<div className="more-items-indicator" style={{ opacity: Number(isThereMoreAfterTheSkyline) }}>
				<MoreFieldsBelowIcon />
			</div>
		</div>
	);
}

function FieldsDrawer(props: FieldInternalPanel) {
	if (!props.value?.length) {
		return (
			<div className="placeholder">
				<svg className="icon" viewBox="0 0 200 50">
					<text y="35" x="20">¯\_(ツ)_/¯</text>
				</svg>
				<p>There are no fields here yet.</p>
				<p>What about starting adding some? 🤔</p>
			</div>
		);
	}

	return (
		<FieldsCustomizer {...props} />
	);
}

function FieldsCustomizer(props: FieldInternalPanel) {
	const panels = props.value.map((field, index) => {
		return (
			<div className={`field-edit-item field-${field.fieldKey || "new"}`} key={field.fieldKey || `new-${index}`}></div>
		);
	});

	return (
		<>
			{panels}
		</>
	);
}
