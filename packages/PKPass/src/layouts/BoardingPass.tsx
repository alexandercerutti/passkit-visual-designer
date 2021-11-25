import * as React from "react";
import { PassMixedProps } from "../..";
import { PassHeader } from "./sections/Header";
import { TravelPrimaryFields } from "./sections/PrimaryFields";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcode from "./components/Barcodes";

export default function BoardingPass(props: PassMixedProps) {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		transitType,
		logo,
		logoText,
		footerImage,
		icon,
	} = props;

	return (
		<>
			<PassHeader logo={logo} logoText={logoText} headerFields={headerFields} />
			<TravelPrimaryFields transitType={transitType} fields={primaryFields} />
			<FieldsRow maximumElementsAmount={5} elements={auxiliaryFields} id="auxiliaryFields" />
			<FieldsRow maximumElementsAmount={4} elements={secondaryFields} id="secondaryFields" />
			<Footer allowFooterImage icon={icon} src={footerImage}>
				<Barcode format={barcode?.format} fallbackShape="rect" />
			</Footer>
		</>
	);
}
