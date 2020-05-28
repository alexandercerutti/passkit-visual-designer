import * as React from "react";
import "./style.less";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import { Field, FieldLabel, FieldValue } from "../../components/Field";
import ImageField from "../../components/ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";

interface PFThumbnailProps extends PrimaryFieldsProps {
	thumbnailSrc?: string;
}

export default function ThumbnailPrimaryField(props: React.PropsWithChildren<PFThumbnailProps>) {
	const data = getSafeFieldData(props.fields, 1)
		.slice(0, 1)
		.map((fieldData, index) => {
			const key = `primaryFields.${index}`;
			return (
				<Field {...fieldData} id={key} key={key}>
					<FieldLabel {...fieldData} />
					<FieldValue {...fieldData} />
				</Field>
			);
		});

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
