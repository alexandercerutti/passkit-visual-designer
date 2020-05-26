import * as React from "react";
import { getSafeFieldData } from "../../Field/getSafeFieldData";
import ImageField from "../../ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { FieldValue, FieldLabel } from "../../Field";
import "./style.less";

interface PFStripProps extends PrimaryFieldsProps {
	stripSrc?: string;
}

export default function StripPrimaryFields(props: React.PropsWithChildren<PFStripProps>): JSX.Element {
	const data = getSafeFieldData(props.fields, 1)
		.slice(0, 1)
		.map((field, index) => {
			return (
				<React.Fragment key="primaryField">
					<FieldValue {...field} />
					<FieldLabel {...field} />
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
