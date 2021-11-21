import * as React from "react";
import "./style.less";
import { Constants } from "@pkvd/pass";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import ImageField from "../../../components/ImageField";
import Field, { FieldValue, FieldLabel } from "../../../components/Field";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../../model";

interface PFStripProps {
	fields?: Constants.PassField[];
	stripSrc?: string;
}

export default function StripPrimaryFields(
	props: React.PropsWithChildren<PFStripProps>
): JSX.Element {
	const { fields, stripSrc } = props;
	const [primaryFieldsClickHandler, stripImageClickHandler] = useRegistrations([
		[FieldKind.FIELDS, "primaryFields"],
		[FieldKind.IMAGE, "stripImage"],
	]);

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
