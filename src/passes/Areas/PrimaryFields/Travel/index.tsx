import * as React from "react";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import { GhostField, FieldLabel, FieldValue } from "../../components/Field";
import { concatClassNames } from "../../../utils";
import { PKTransitType } from "../../../constants";
import { PKTransitIcon } from "./icons";
import "./style.less";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../model";

interface PFTravelProps extends PrimaryFieldsProps {
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const { register, onClick, id: parentId, fields, transitType, className } = props;

	useRegistrations(register, [
		[FieldKind.FIELDS, "Primary Fields"]
	]);

	const [from, to] = getSafeFieldData(fields, 2)
		.slice(0, 2)
		.map((fieldData, index) => {
			const id = `${parentId}.${index}`;

			return (
				<GhostField key={id}
					{...fieldData}
					onClick={onClick}
					id={id}
				>
					<FieldLabel {...fieldData} />
					<FieldValue {...fieldData} />
				</GhostField>
			);
		});

	const TransitIcon = PKTransitIcon(transitType === undefined && PKTransitType.Generic || transitType);

	return (
		<div className={concatClassNames("primary-container", className)}>
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
