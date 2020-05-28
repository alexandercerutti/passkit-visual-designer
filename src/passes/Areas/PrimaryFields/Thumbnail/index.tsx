import * as React from "react";
import "./style.less";
import { getSafeFieldData } from "../../components/Field/getSafeFieldData";
import { Field, FieldLabel, FieldValue } from "../../components/Field";
import ImageField from "../../components/ImageField";
import PrimaryFieldsProps from "../primaryFieldsProps";
import { useRegistrations } from "../../useRegistrations";
import { FieldKind } from "../../../../model";

interface PFThumbnailProps extends PrimaryFieldsProps {
	thumbnailSrc?: string;
}

export default function ThumbnailPrimaryField(props: React.PropsWithChildren<PFThumbnailProps>) {
	const { register, onClick, id: parentId, fields, thumbnailSrc, className } = props;

	useRegistrations(register, [
		[FieldKind.FIELDS, "Primary Fields"],
		[FieldKind.IMAGE, "Thumbnail"]
	]);

	const data = getSafeFieldData(fields, 1)
		.slice(0, 1)
		.map((fieldData, index) => {
			const key = `${parentId}.${index}`;
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
					id="thumbnail"
					height="100%"
					className="thumbnail"
					src={props.thumbnailSrc}
				/>
			</div>
		</div>
	)
}
