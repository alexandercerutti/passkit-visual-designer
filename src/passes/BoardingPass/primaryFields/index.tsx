import * as React from "react";
import { Field, FieldLabel, FieldValue } from "../../Components/Field";
import { PKTransitType } from "../../constants";
import "./primaryFields.less";
import { RegistrableComponent } from "../../Components/withRegistration";
import { PKTransitIcon } from "./icons";

export interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], "id">[];
	subkind: PKTransitType;
}

export default function PrimaryFields(props: PrimaryFieldsProps) {
	const [from, to] = props.primaryFieldsData || [null, null];

	return (
		<PrimaryFieldsWrapper {...props}>
			<LabelsRow {...props} />
			<ValuesRow {...props} />
		</PrimaryFieldsWrapper>
	)
}

function LabelsRow(props: PrimaryFieldsProps) {
	const labels = (
		props.primaryFieldsData &&
		props.primaryFieldsData.map((fieldData, index) => {
			if (!fieldData.label) {
				return null;
			}

			const id = `primaryFields.${index}.label`;

			return (
				<FieldLabel
					label={fieldData.label}
					labelColor={fieldData.labelColor}
					textAlignment={fieldData.textAlignment}
					fieldKey={fieldData.fieldKey}
					key={id}
					id={id}
					onSelect={fieldData.onSelect}
				/>
			)
		})
	) || null;

	return (
		<div className="label-row">
			{labels}
		</div>
	);
}

function ValuesRow(props: PrimaryFieldsProps) {
	const [from, to] = (
		props.primaryFieldsData &&
		props.primaryFieldsData.map((fieldData, index) => {
			if (!fieldData.label) {
				return null;
			}

			return (
				<FieldValue
					value={fieldData.value}
					textColor={fieldData.textColor}
					textAlignment={fieldData.textAlignment}
					fieldKey={fieldData.fieldKey}
					key={`primaryFields.${index}.value`}
					id={`primaryFields.${index}.value`}
					onSelect={fieldData.onSelect}
				/>
			)
		})
	) || null;

	const TransitIcon = PKTransitIcon(PKTransitType.Air);

	return (
		<div className="value-row">
			{from}
			<TransitIcon
				width={30}
				height={30}
				fill="#000"
			/>
			{to}
		</div>
	);
}

function PrimaryFieldsWrapper(props: PrimaryFieldsProps & { children?: React.ReactNode[] }) {
	return (
		<div className={`${props.className || ""} primary-container`.trim()}>
			{props.children}
		</div>
	);
}
