import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import { StripPrimaryFields } from "./sections/PrimaryFields";
import FieldsRow from "./sections/FieldRow";
import Barcode from "./components/Barcodes";
import Footer from "./sections/Footer";

export default function Coupon(props: PassMixedProps): JSX.Element {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		stripImage,
		logo,
		logoText,
		icon,
	} = props;

	return (
		<>
			<PassHeader headerFields={headerFields} logo={logo} logoText={logoText} />
			<StripPrimaryFields stripSrc={stripImage} fields={primaryFields} />
			<FieldsRow
				// @TODO: this component, as is,
				// might not be fully correct because 4 fields
				// get rendered in two columns. We don't have
				// an example of a coupon / store card with
				// more than two fields.
				elements={[...secondaryFields, ...auxiliaryFields]}
				// @TODO - Coupons can have up to 4 fields if
				// barcode is a square barcode
				maximumElementsAmount={-1}
				id="secondary-auxiliary"
			/>
			<Footer icon={icon}>
				<Barcode format={barcode?.format} fallbackShape="square" />
			</Footer>
		</>
	);
}
