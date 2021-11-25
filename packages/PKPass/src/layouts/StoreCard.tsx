import * as React from "react";
import { PassMixedProps } from "../..";
import { PassHeader } from "./sections/Header";
import { StripPrimaryFields } from "./sections/PrimaryFields";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";

export default function StoreCard(props: PassMixedProps): JSX.Element {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logo,
		logoText,
		stripImage,
		icon,
	} = props;

	return (
		<>
			<PassHeader logo={logo} logoText={logoText} headerFields={headerFields} />
			<StripPrimaryFields stripSrc={stripImage} fields={primaryFields} />
			<FieldsRow
				id="secondary-auxiliary"
				// @TODO: this component, as is,
				// might not be fully correct because 4 fields
				// get rendered in two columns. We don't have
				// an example of a coupon / store card with
				// more than two fields.
				elements={[...secondaryFields, ...auxiliaryFields]}
				// @TODO - Coupons can have up to 4 fields if
				// barcode is a square barcode
				maximumElementsAmount={-1}
			/>
			<Footer icon={icon}>
				<Barcodes format={barcode?.format} fallbackShape="rect" />
			</Footer>
		</>
	);
}
