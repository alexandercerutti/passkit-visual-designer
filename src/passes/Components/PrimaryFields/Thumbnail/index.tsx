import * as React from "react";
import "./style.less";
import { getSafeFieldData } from "../../Field/getSafeFieldData";
import { Field } from "../../Field";
import ImageField from "../../ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";

interface PFThumbnailProps extends PrimaryFieldsProps {
	thumbnailSrc?: string;
}

export default function ThumbnailPrimaryField(props: React.PropsWithChildren<PFThumbnailProps>) {
	const data = getSafeFieldData(props.fields, 1)
		.slice(0, 1)
		.map((field, index) => {
			const key = `primaryFields.${index}`;
			return (
				<Field {...field} id={key} key={key} />
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
