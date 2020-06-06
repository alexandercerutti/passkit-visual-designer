import * as React from "react";
import { PanelProps } from "../..";
import { FieldProps } from "../../../../../passes/Areas/components/Field";
import { FieldsArrowIcon, FieldsAddIcon, MoreFieldsBelowIcon } from "./icons";
import FieldTitle from "../FieldTitle";
import "./style.less";
import { PKDataDetectorType, PKTextAlignment, PKDateStyle } from "../../../../../passes/constants";

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
				<FieldsAddIcon className="add" onClick={() => setFields([...fields, {} as FieldProps])} />
			</header>
			<div className="fields" ref={listRef} onScroll={onListScrollHandler.current}>
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

	const panels = props.value.map((field, index) => (
		<div className={`field-edit-item field-${field.fieldKey || "new"}`} key={field.fieldKey || `new-${index}`}>
			<FieldPropertiesList {...props} />
		</div>
	));

	return (
		<>
			{panels}
		</>
	);
}

const OptionalFieldProps = [{
	property: "label",
	type: "string"
}, {
	property: "attributedValue",
	type: "string",
}, {
	property: "changeMessage",
	type: "string"
}, {
	property: "dataDetectorTypes",
	type: PKDataDetectorType,
}, {
	property: "textAlignment",
	type: PKTextAlignment
}, {
	property: "dateStyle",
	type: PKDateStyle
}, {
	property: "timeStyle",
	type: PKDateStyle
}, {
	property: "ignoresTimeZone",
	type: Boolean
}, {
	property: "isRelative",
	type: Boolean
}];

function FieldPropertiesList(props: FieldInternalPanel) {
	const [shouldShowAddMenu, showAddMenu] = React.useState(false);
	const [usedProperties, updateProperties] = React.useState([]);

	const onPropertySelectHandler = React.useRef((appliedProps: string[]) => {
		console.log("Selected voice", appliedProps[appliedProps.length - 1]);
		showAddMenu(false);
		updateProperties(appliedProps);
	});

	return (
		<div className="field-properties-list">
			<div onClick={() => showAddMenu(!shouldShowAddMenu)}>
				<FieldsAddIcon className="add" />
				<span>Add property</span>
			</div>
			<AvailableFieldsList
				className={!shouldShowAddMenu && "hidden" || ""}
				appliedProperties={usedProperties}
				onPropertySelect={onPropertySelectHandler.current}
			/>
		</div>
	);
}

interface AvailableFieldsListProps {
	appliedProperties?: string[],
	onPropertySelect: (propertyName: string[]) => void;
	className?: string;
}

function AvailableFieldsList({ appliedProperties = [], onPropertySelect, className }: AvailableFieldsListProps) {
	const properties = (
		!appliedProperties.length && OptionalFieldProps ||
		OptionalFieldProps
			.filter(prop => !appliedProperties.includes(prop.property))
	).map(({ property }) => (
		<div key={property} className="field-property" onClick={() => onPropertySelect([...appliedProperties, property])}>
			{property}
		</div>
	));

	return (
		<div className={`field-new-property-list ${className}`}>
			{properties}
		</div>
	)
}
