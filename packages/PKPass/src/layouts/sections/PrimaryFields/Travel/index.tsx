import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import Field, { FieldLabel, FieldValue } from "../../../components/Field";
import { PKTransitIcon } from "./icons";
import { useFieldRegistration } from "../../useFieldRegistration";
import { FieldKind } from "../../../../../../../src/model";

interface PFTravelProps {
	fields?: Pass.PassFieldContent[];
	transitType: Pass.PKTransitType;
}

export default function PrimaryFields(props: PFTravelProps) {
	const { fields, transitType } = props;
	const parentId = "primaryFields";

	const primaryFieldsClickHandler = useFieldRegistration(FieldKind.FIELDS, parentId);

	const [from, to] = getFilteredFieldData(fields, 2, 2).map((fieldData, index) => {
		const id = `${parentId}.${index}`;

		return (
			<Field
				ghost
				key={id}
				onClick={() => primaryFieldsClickHandler(fieldData?.key ?? null)}
				fieldData={fieldData}
			>
				<FieldLabel fieldData={fieldData} />
				<FieldValue fieldData={fieldData} />
			</Field>
		);
	});

	return (
		<div className="travel-primaryFields">
			{from}
			<PKTransitIcon
				type={(transitType === undefined && Pass.PKTransitType.Generic) || transitType}
				width={30}
				height={30}
			/>
			{to}
		</div>
	);
}
