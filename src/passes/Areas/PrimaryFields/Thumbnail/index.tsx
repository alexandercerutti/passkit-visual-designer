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
	const { register, fields, thumbnailSrc, children } = props;
	const parentId = "PrimaryFields";

	const [primaryFieldsClickHandler, thumbnailClickHandler] = useRegistrations(register, [
		[FieldKind.FIELDS, parentId],
		[FieldKind.IMAGE, "Thumbnail"]
	]);

	const data = getSafeFieldData(fields, 1)
		.map((fieldData, index) => {
			const key = `${parentId}.${index}`;

			return (
				<Field
					key={key}
					onClick={() => primaryFieldsClickHandler(fieldData?.fieldKey ?? null)}
					{...fieldData}
				>
					<FieldLabel {...fieldData} />
					<FieldValue {...fieldData} />
				</Field>
			);
		});

	return (
		<div className="thumbnail-primaryFields">
			<div className="left">
				{data}
				{children}
			</div>
			<div className="right">
				<ImageField
					height="100%"
					className="thumbnail"
					src={thumbnailSrc}
					onClick={thumbnailClickHandler}
				/>
			</div>
		</div>
	)
}
