import * as React from "react";
import { FieldLabel, FieldValue } from "../../Field";
import { PKTransitType } from "../../../constants";
import "./style.less";
import { PKTransitIcon } from "./icons";
import { getSafeFieldData, concatClassNames } from "../../../utils";
import PrimaryFieldsProps from "../primaryFieldsProps";

interface PFTravelProps extends PrimaryFieldsProps {
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	return (
		<div className={concatClassNames("primary-container", props.className)}>
			<LabelsRow {...props} />
			<ValuesRow {...props} />
		</div>
	);
}

function LabelsRow(props: PFTravelProps) {
	const labels = getSafeFieldData(props.fields, 2)
		.slice(0, 2)
		.map((fieldData, index) => {
			const id = `primaryFields.${index}.label`;

			return (
				<FieldLabel
					label={fieldData.label}
					labelColor={fieldData.labelColor}
					textAlignment={fieldData.textAlignment}
					fieldKey={fieldData.fieldKey}
					key={id}
					id={id}
					onClick={props.onClick}
					register={props.register}
				/>
			)
		});

	return (
		<div className="label-row">
			{labels}
		</div>
	);
}

function ValuesRow(props: PFTravelProps) {
	const [from, to] = getSafeFieldData(props.fields, 2)
		.slice(0, 2)
		.map((fieldData, index) => {
			return (
				<FieldValue
					value={fieldData.value}
					textColor={fieldData.textColor}
					textAlignment={fieldData.textAlignment}
					fieldKey={fieldData.fieldKey}
					key={`primaryFields.${index}.value`}
					id={`primaryFields.${index}.value`}
					onClick={props.onClick}
					register={props.register}
				/>
			)
		});

	const TransitIcon = PKTransitIcon(props.transitType === undefined && PKTransitType.Generic || props.transitType);

	return (
		<div className="value-row">
			{from}
			<TransitIcon
				width={30}
				height={30}
				fill={"#d2d2d2"} // @TODO set label color
			/>
			{to}
		</div>
	);
}
