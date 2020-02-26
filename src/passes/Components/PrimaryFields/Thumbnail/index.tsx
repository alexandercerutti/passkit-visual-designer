import * as React from "react";
import "./style.less";
import { getSafeFieldData } from "../../../utils";
import { RegistrableComponent } from "../../withRegistration";
import { Field } from "../../Field";
import ImageField from "../../ImageField";

interface TPFProps extends Omit<RegistrableComponent, "id">, React.PropsWithChildren<any> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
}

export default function ThumbnailPrimaryField(props: TPFProps) {
	const data = getSafeFieldData(props.primaryFieldsData, 1)
		.slice(0, 1)
		.map((fieldData, index) => {
			return (
				<Field {...fieldData} id={`primaryFields.${index}`} />
			);
		})

	return (
		<div className="thumbnail-primaryFields">
			<div className="left-column">
				{data}
				{props.children}
			</div>
			<ImageField
				id="primaryField.thumbnail"
				height="100%"
				className="thumbnail"
			/>
		</div>
	)
}
