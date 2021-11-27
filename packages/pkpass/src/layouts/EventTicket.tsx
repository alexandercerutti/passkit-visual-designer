import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import { StripPrimaryFields, ThumbnailPrimaryFields } from "./sections/PrimaryFields";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import { useFieldRegistration } from "./sections/useFieldRegistration";
import { FieldKind } from "./components/Field";

type PrimaryFieldPropsKind = Parameters<
	typeof StripPrimaryFields | typeof ThumbnailPrimaryFields
>[0];

export default function EventTicket(props: PassMixedProps): JSX.Element {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logoText,
		logo,
		icon,
		stripImage,
		thumbnailImage,
	} = props;

	let fieldsFragment: React.ReactElement<PrimaryFieldPropsKind>;

	const SecondaryFieldRow = (
		<FieldsRow elements={secondaryFields} maximumElementsAmount={4} id="secondaryFields" />
	);

	/** We fallback to strip image model if none of the required property is available */
	if (props.hasOwnProperty("stripImage") || !props.hasOwnProperty("backgroundImage")) {
		fieldsFragment = (
			<>
				<StripPrimaryFields stripSrc={stripImage} fields={primaryFields} />
				{SecondaryFieldRow}
			</>
		);
	} else if (props.hasOwnProperty("backgroundImage")) {
		useFieldRegistration(FieldKind.IMAGE, "backgroundImage");

		fieldsFragment = (
			<ThumbnailPrimaryFields thumbnailSrc={thumbnailImage} fields={primaryFields}>
				{SecondaryFieldRow}
			</ThumbnailPrimaryFields>
		);
	}

	return (
		<>
			<PassHeader headerFields={headerFields} logoText={logoText} logo={logo} />
			{fieldsFragment}
			<FieldsRow id="auxiliaryFields" maximumElementsAmount={4} elements={auxiliaryFields} />
			<Footer icon={icon}>
				<Barcodes format={barcode?.format} fallbackShape="square" />
			</Footer>
		</>
	);
}
