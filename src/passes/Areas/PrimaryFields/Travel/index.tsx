import * as React from "react";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import { GhostField, FieldLabel, FieldValue } from "../../components/Field";
import { concatClassNames } from "../../../utils";
import { PKTransitType } from "../../../constants";
import { PKTransitIcon } from "./icons";
import "./style.less";

interface PFTravelProps extends PrimaryFieldsProps {
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const [from, to] = getSafeFieldData(props.fields, 2)
		.slice(0, 2)
		.map((fieldData, index) => {
			const id = `${props.id}.${index}`;

			return (
				<GhostField key={id}
					{...fieldData}
					register={props.register}
					onClick={props.onClick}
					id={id}
				>
					<FieldLabel {...fieldData} />
					<FieldValue {...fieldData} />
				</GhostField>
			);
		});

	const TransitIcon = PKTransitIcon(props.transitType === undefined && PKTransitType.Generic || props.transitType);

	return (
		<div className={concatClassNames("primary-container", props.className)}>
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
