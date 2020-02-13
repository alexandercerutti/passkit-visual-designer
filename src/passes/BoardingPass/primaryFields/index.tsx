import * as React from "react";
import { Field, FieldLabel, FieldValue } from "../../Components/Field";
import { PKTransitType } from "../../constants";
import "./primaryFields.less";
import { RegistrableComponent } from "../../Components/withRegistration";
import { PKTransitIcon } from "./icons";

export interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
	subkind: PKTransitType;
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
	const labels = (
		(
			props.primaryFieldsData &&
			props.primaryFieldsData || [{}, {}] as PrimaryFieldsProps["primaryFieldsData"]
		).map((fieldData, index) => {
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
		})
	);

	return (
		<div className="label-row">
			{labels}
		</div>
	);
}

function ValuesRow(props: PrimaryFieldsProps) {
	const primaryFieldsData = (
		props.primaryFieldsData &&
		props.primaryFieldsData.length &&
		props.primaryFieldsData
	) || undefined;

	const [from, to] = (
		(
			primaryFieldsData ||
			[{}, {}] as typeof props.primaryFieldsData
		).map((fieldData, index) => {
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
		})
	);

	const TransitIcon = PKTransitIcon(
		primaryFieldsData && props.subkind || PKTransitType.Generic
	);

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
		<div className={`${props.className || ""} primary-container`.trim()}>
			{props.children}
		</div>
	);
}
