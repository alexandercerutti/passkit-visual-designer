import * as React from "react";
import { PKDataDetectorType, PKTextAlignment, PKDateStyle } from "../../../../../../passes/constants";
import { DeleteFieldIcon, ListAddProp } from "../icons";

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

interface FieldsDrawerElementProps {
	onFieldDelete(key: string): void;
	fieldKey: string;
}

export function FieldsDrawerElement(props: FieldsDrawerElementProps) {
	const [usedProperties, setUsedProperties] = React.useState([
		"key", "value"
	]);

	return (
		<div className={`field-edit-item field-${props.fieldKey}`} key={props.fieldKey}>
			<FDEPropertiesList usedProperties={usedProperties} />
			<FDEOptionsBar
				deleteField={props.onFieldDelete}
				updateUsedProperties={setUsedProperties}
				usedProperties={usedProperties}
				fieldKey={props.fieldKey}
			/>
		</div>
	);
}

interface FPPropsListProps {
	usedProperties?: string[];
}

function FDEPropertiesList(props: FPPropsListProps) {
	const properties = props.usedProperties.map((element) => (
		<div key={element}>{element}</div>
	));

	return (
		<div className="field-properties-list">
			{properties}
		</div>
	);
}

interface FPOptionsProps {
	deleteField(key: string): void;
	updateUsedProperties(usedProperties: string[]): void;
	usedProperties?: string[];
	fieldKey: string;
}

function FDEOptionsBar(props: FPOptionsProps) {
	const [shouldShowAddMenu, showAddMenu] = React.useState(false);

	const onPropertySelectHandler = React.useRef((appliedProps: string[]) => {
		if (appliedProps !== null) {
			console.log("Selected voice", appliedProps[appliedProps.length - 1]);
			props.updateUsedProperties(appliedProps);
		}

		showAddMenu(false);
	});

	// Excluding the mandatory ones
	const allOptionalPropertiesAdded = props.usedProperties?.length - 2 === OptionalFieldProps.length;

	return (
		<>
			<div className="field-options-row">
				<div className="field-delete" onClick={() => props.deleteField(props.fieldKey)}>
					<DeleteFieldIcon className="danger" />
				</div>
				<div
					className="property-add-row"
					style={{ display: allOptionalPropertiesAdded ? "none" : "inherit" }}
					onClick={() => showAddMenu(true)}
				>
					<ListAddProp className="add" />
				</div>
			</div>
			<AvailableFieldsList
				className={!shouldShowAddMenu && "hidden" || ""}
				appliedProperties={props.usedProperties}
				onPropertySelect={onPropertySelectHandler.current}
			/>
		</>
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
		OptionalFieldProps.filter(prop => !appliedProperties.includes(prop.property))
	).map(({ property }) => (
		<div key={property} className="field-property" onClick={() => onPropertySelect([...appliedProperties, property])}>
			{property}
		</div>
	));

	return (
		<div className={`field-prop-choice-overlay ${className}`} onClick={() => onPropertySelect(null)}>
			<div className="field-new-property-list">
				{properties}
			</div>
		</div>
	)
}
