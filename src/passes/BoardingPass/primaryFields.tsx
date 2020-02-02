import * as React from "react";
import Field, { FieldSetProps } from "../Components/Field";
import { PKTransitType } from "../constants";
import "./primaryFields.less";
import { RegistrableComponent } from "../Components/withRegistration";
import PKAirIcon from "./icons/plane";

export interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<FieldSetProps, "id">[];
	subkind: PKTransitType;
}

export default function PrimaryFields(props: PrimaryFieldsProps) {
	const [from, to] = props.primaryFieldsData || [null, null];

	return (
		<PrimaryFieldsWrapper {...props}>
			<Field id="primaryFields.1" {...from} />
			{from && to &&
				<PKAirIcon
					width={30}
					height={30}
					fill="#000"
				/>
			}
			<Field id="primaryFields.2" {...to} />
		</PrimaryFieldsWrapper>
	)
}

function PrimaryFieldsWrapper(props: PrimaryFieldsProps & { children?: React.ReactNode[] }) {
	return (
		<div className={`${props.className || ""} primary-container`.trim()}>
			{props.children}
		</div>
	);
}
