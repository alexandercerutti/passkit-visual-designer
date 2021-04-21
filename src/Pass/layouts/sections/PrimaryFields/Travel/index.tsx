import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import { GhostField, FieldLabel, FieldValue } from "../../../components/Field";
import { PKTransitType } from "../../../../constants";
import { PKTransitIcon } from "./icons";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../../model";

interface PFTravelProps {
	fields?: Constants.PassField[];
	transitType: PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const { fields, transitType } = props;
	const parentId = "primaryFields";

	const [primaryFieldsClickHandler] = useRegistrations([[FieldKind.FIELDS, parentId]]);

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

	return (
		<div className="travel-primaryFields">
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
