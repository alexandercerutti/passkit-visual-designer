import * as React from "react";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import { GhostField, FieldLabel, FieldValue } from "../../components/Field";
import { createClassName } from "../../../../utils";
import { PKTransitType } from "../../../constants";
import { PKTransitIcon } from "./icons";
import "./style.less";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../model";

interface PFTravelProps extends PrimaryFieldsProps {
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const { register, fields, transitType } = props;
	const parentId = "PrimaryFields";

	const [primaryFieldsClickHandler] = useRegistrations(register, [
		[FieldKind.FIELDS, parentId]
	]);

	const [from, to] = getSafeFieldData(fields, 2)
		.map((fieldData, index) => {
			const id = `${parentId}.${index}`;

			return (
				<GhostField
					key={id}
					onClick={() => primaryFieldsClickHandler(fieldData?.key ?? null)}
					fieldData={fieldData}
				>
					<FieldLabel fieldData={fieldData} />
					<FieldValue fieldData={fieldData} />
				</GhostField>
			);
		});

	const className = createClassName(["primary-container", "className"]);

	return (
		<div className={className}>
			{from}
			<PKTransitIcon
				type={transitType === undefined && PKTransitType.Generic || transitType}
				width={30}
				height={30}
				fill={"#d2d2d2"} // @TODO set label color
			/>
			{to}
		</div>
	);
}
