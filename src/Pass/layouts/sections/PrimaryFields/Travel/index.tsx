import * as React from "react";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import { GhostField, FieldLabel, FieldValue } from "../../../components/Field";
import { createClassName } from "../../../../../utils";
import { PKTransitType } from "../../../../constants";
import { PKTransitIcon } from "./icons";
import "./style.less";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../../model";

interface PFTravelProps extends PrimaryFieldsProps {
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const { register, fields, transitType, className: PFClassName } = props;
	const parentId = "primaryFields";

	const [primaryFieldsClickHandler] = useRegistrations(register, [[FieldKind.FIELDS, parentId]]);

	const [from, to] = getFilteredFieldData(fields, 2, 2).map((fieldData, index) => {
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

	const className = createClassName(["travel-primaryFields", PFClassName]);

	return (
		<div className={className}>
			{from}
			<PKTransitIcon
				type={(transitType === undefined && PKTransitType.Generic) || transitType}
				width={30}
				height={30}
			/>
			{to}
		</div>
	);
}
