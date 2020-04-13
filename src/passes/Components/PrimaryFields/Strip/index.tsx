import * as React from "react";
import { FieldValue, FieldLabel } from "../../Field";
import { getSafeFieldData } from "../../../utils";
import ImageField from "../../ImageField";
import "./style.less";
import PrimaryFieldsProps from "../primaryFieldsProps";

interface PFStripProps extends PrimaryFieldsProps {
	stripSrc?: string;
}

export default function StripPrimaryFields(props: React.PropsWithChildren<PFStripProps>): JSX.Element {
	const data = getSafeFieldData(props.fields, 1)
		.slice(0, 1)
		.map((field, index) => {
			const labelId = `primaryFields.${index}.label`;
			const valueId = `primaryFields.${index}.value`;

			return (
				<React.Fragment key="primaryField">
					<FieldValue
						{...field}
						id={valueId}
						onClick={props.onClick}
						register={props.register}
					/>
					<FieldLabel
						{...field}
						id={labelId}
						onClick={props.onClick}
						register={props.register}
					/>
				</React.Fragment>
			);
		})

	return (
		<div className="strip-primaryFields">
			<div className="row">
				{data}
			</div>
			<ImageField src={props.stripSrc} id="primaryFields.stripImage" />
		</div>
	);
}
