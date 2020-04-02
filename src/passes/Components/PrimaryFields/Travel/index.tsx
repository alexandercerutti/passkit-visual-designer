import * as React from "react";
import { Field, FieldLabel, FieldValue } from "../../Field";
import { PKTransitType } from "../../../constants";
import "./primaryFields.less";
import { RegistrableComponent } from "../../withRegistration";
import { PKTransitIcon } from "./icons";
import { getSafeFieldData, concatClassNames } from "../../../utils";

export interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PrimaryFieldsProps) {
	return (
		<PrimaryFieldsWrapper {...props}>
			<LabelsRow {...props} />
			<ValuesRow {...props} />
		</PrimaryFieldsWrapper>
	)
}

function LabelsRow(props: PrimaryFieldsProps) {
	const labels = getSafeFieldData(props.primaryFieldsData, 2)
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

function ValuesRow(props: PrimaryFieldsProps) {
	const [from, to] = getSafeFieldData(props.primaryFieldsData, 2)
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

function PrimaryFieldsWrapper(props: PrimaryFieldsProps & { children?: React.ReactNode[] }) {
	return (
		<div className={concatClassNames("primary-container", props.className)}>
			{props.children}
		</div>
	);
}
