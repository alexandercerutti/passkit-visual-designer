import * as React from "react";
import { getSafeFieldData } from "../../Field/getSafeFieldData";
import ImageField from "../../ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";
import useBoundField from "../../Field/useBoundField";
import "./style.less";

interface PFStripProps extends PrimaryFieldsProps {
	stripSrc?: string;
}

export default function StripPrimaryFields(props: React.PropsWithChildren<PFStripProps>): JSX.Element {
	const registrationProps = (({ id, register }) => ({ id, register }))(props);
	const [FieldLabel, FieldValue] = useBoundField(registrationProps);

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
