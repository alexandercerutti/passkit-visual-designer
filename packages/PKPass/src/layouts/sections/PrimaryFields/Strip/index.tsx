import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import ImageField from "../../../components/ImageField";
import Field, { FieldValue, FieldLabel } from "../../../components/Field";
import { useFieldRegistration } from "../../useFieldRegistration";
import { FieldKind } from "../../../../../../../src/model";

interface PFStripProps {
	fields?: Constants.PassField[];
	stripSrc?: string;
}

export default function StripPrimaryFields(
	props: React.PropsWithChildren<PFStripProps>
): JSX.Element {
	const { fields, stripSrc } = props;

	const primaryFieldsClickHandler = useFieldRegistration(FieldKind.FIELDS, "primaryFields");
	const stripImageClickHandler = useFieldRegistration(FieldKind.IMAGE, "stripImage");

	const data = getFilteredFieldData(fields, 1, 1).map((data) => {
		return (
			<Field ghost key="primaryField" onClick={primaryFieldsClickHandler} fieldData={data}>
				<FieldValue fieldData={data} />
				<FieldLabel fieldData={data} />
			</Field>
		);
	});

	return (
		<div className="strip-primaryFields">
			<div className="row">{data}</div>
			<ImageField src={stripSrc} onClick={stripImageClickHandler} />
		</div>
	);
}
