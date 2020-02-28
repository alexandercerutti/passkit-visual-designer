import * as React from "react";
import { RegistrableComponent } from "../../withRegistration";
import { Field, FieldValue, FieldLabel } from "../../Field";
import { getSafeFieldData } from "../../../utils";
import ImageField from "../../ImageField";
import "./style.less";

export interface PrimaryFieldsProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
	stripSrc?: string;
}

export default function StripPrimaryFields(props: PrimaryFieldsProps): JSX.Element {
	const data = getSafeFieldData(props.primaryFieldsData, 1)
		.slice(0, 1)
		.map((fieldData, index) => {
			const labelId = `primaryFields.${index}.label`;
			const valueId = `primaryFields.${index}.value`;

			return (
				<>
					<FieldValue
						{...fieldData}
						id={valueId}
						onClick={props.onClick}
						register={props.register}
					/>
					<FieldLabel
						{...fieldData}
						id={labelId}
						onClick={props.onClick}
						register={props.register}
					/>
				</>
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
