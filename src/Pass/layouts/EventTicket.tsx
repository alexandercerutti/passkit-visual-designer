import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import FieldsRow from "./sections/FieldRow";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import { useRegistrations } from "./sections/useRegistrations";
import { FieldKind } from "../../model";

type PrimaryFieldPropsKind = Parameters<
	typeof StripPrimaryFields | typeof ThumbnailPrimaryField
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
		useRegistrations([[FieldKind.IMAGE, "backgroundImage"]]);

		fieldsFragment = (
			<ThumbnailPrimaryField thumbnailSrc={thumbnailImage} fields={primaryFields}>
				{SecondaryFieldRow}
			</ThumbnailPrimaryField>
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
