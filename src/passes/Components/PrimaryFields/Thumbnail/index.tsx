import * as React from "react";
import "./style.less";
import { getSafeFieldData } from "../../../utils";
import { RegistrableComponent } from "../../withRegistration";
import { Field } from "../../Field";
import ImageField from "../../ImageField";

export interface TPFProps extends Omit<RegistrableComponent, "id"> {
	className?: string;
	primaryFieldsData: Omit<Parameters<typeof Field>[0], keyof RegistrableComponent>[];
	thumbnailSrc?: string;
}

export default function ThumbnailPrimaryField(props: React.PropsWithChildren<TPFProps>) {
	const data = getSafeFieldData(props.primaryFieldsData, 1)
		.slice(0, 1)
		.map((fieldData, index) => {
			const key = `primaryFields.${index}`;
			return (
				<Field {...fieldData} id={key} key={key} />
			);
		})

	return (
		<div className="thumbnail-primaryFields">
			<div className="left">
				{data}
				{props.children}
			</div>
			<div className="right">
				<ImageField
					id="primaryField.thumbnail"
					height="100%"
					className="thumbnail"
					src={props.thumbnailSrc}
				/>
			</div>
		</div>
	)
}
