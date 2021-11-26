import * as React from "react";
import "./style.less";
import { Pass } from "@pkvd/passkit-types";
import { getFilteredFieldData } from "../../../components/Field/getFilteredFieldData";
import Field, { FieldKind, FieldLabel, FieldValue } from "../../../components/Field";
import ImageField from "../../../components/ImageField";
import { useFieldRegistration } from "../../useFieldRegistration";

interface PFThumbnailProps {
	fields?: Pass.PassFieldContent[];
	thumbnailSrc?: string;
}

export default function ThumbnailPrimaryField(props: React.PropsWithChildren<PFThumbnailProps>) {
	const { fields, thumbnailSrc, children } = props;
	const parentId = "primaryFields";

	const primaryFieldsClickHandler = useFieldRegistration(FieldKind.FIELDS, parentId);
	const thumbnailClickHandler = useFieldRegistration(FieldKind.FIELDS, "thumbnailImage");

	const data = getFilteredFieldData(fields, 1, 1).map((fieldData, index) => {
		const key = `${parentId}.${index}`;

		return (
			<Field
				key={key}
				onClick={() => primaryFieldsClickHandler(fieldData?.key ?? null)}
				fieldData={fieldData}
			>
				<FieldLabel fieldData={fieldData} />
				<FieldValue fieldData={fieldData} />
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
					onClick={() => thumbnailClickHandler(null)}
				/>
			</div>
		</div>
	);
}
