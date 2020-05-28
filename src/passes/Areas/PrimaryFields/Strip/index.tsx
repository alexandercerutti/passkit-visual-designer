import * as React from "react";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import ImageField from "../../components/ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { FieldValue, FieldLabel, GhostField } from "../../components/Field";
import "./style.less";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../model";

interface PFStripProps extends PrimaryFieldsProps {
	stripSrc?: string;
}

export default function StripPrimaryFields(props: React.PropsWithChildren<PFStripProps>): JSX.Element {
	useRegistrations(props.register, [
		[FieldKind.FIELDS, "Primary Fields"],
		[FieldKind.IMAGE, "Strip Image"]
	]);

	const data = getSafeFieldData(props.fields, 1)
		.slice(0, 1)
		.map(field => {
			return (
				<GhostField key="primaryField" id="primaryField">
					<FieldValue {...field} />
					<FieldLabel {...field} />
				</GhostField>
			);
		})

	return (
		<div className="strip-primaryFields">
			<div className="row">
				{data}
			</div>
			<ImageField
				src={props.stripSrc}
				id="stripImage"
			/>
		</div>
	);
}
