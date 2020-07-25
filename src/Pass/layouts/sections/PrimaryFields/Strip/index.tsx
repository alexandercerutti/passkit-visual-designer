import * as React from "react";
import { getSafeFieldData } from "../../../components/Field/getSafeFieldData";
import ImageField from "../../../components/ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { FieldValue, FieldLabel, GhostField } from "../../../components/Field";
import "./style.less";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../../model";

interface PFStripProps extends PrimaryFieldsProps {
	stripSrc?: string;
}

export default function StripPrimaryFields(props: React.PropsWithChildren<PFStripProps>): JSX.Element {
	const { register, fields, stripSrc } = props;
	const [primaryFieldsClickHandler, stripImageClickHandler] = useRegistrations(register, [
		[FieldKind.FIELDS, "PrimaryField"],
		[FieldKind.IMAGE, "Strip"]
	]);

	const data = getSafeFieldData(fields, 1)
		.map(data => {
			return (
				<GhostField
					key="primaryField"
					onClick={primaryFieldsClickHandler}
					fieldData={data}
				>
					<FieldValue fieldData={data} />
					<FieldLabel fieldData={data} />
				</GhostField>
			);
		})

	return (
		<div className="strip-primaryFields">
			<div className="row">
				{data}
			</div>
			<ImageField
				src={stripSrc}
				onClick={stripImageClickHandler}
			/>
		</div>
	);
}
