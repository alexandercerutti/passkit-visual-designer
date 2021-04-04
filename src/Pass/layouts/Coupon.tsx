import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import FieldsRow from "./sections/FieldRow";
import Barcode from "./components/Barcodes";
import Footer from "./sections/Footer";
import useAlternativesRegistration from "../useAlternativesRegistration";
import InteractionContext from "../InteractionContext";
import { PassKind } from "../../model";

export default function Coupon(props: PassMixedProps): JSX.Element {
	useAlternativesRegistration(PassKind.COUPON, {
		name: "Coupon Pass",
		specificProps: {},
	});

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

	const { onFieldSelect, registerField } = React.useContext(InteractionContext);

	return (
		<>
			<PassHeader
				headerFields={headerFields}
				logo={logo}
				logoText={logoText}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<StripPrimaryFields
				stripSrc={stripImage}
				fields={primaryFields}
				onClick={onFieldSelect}
				register={registerField}
			/>
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
				onClick={onFieldSelect}
				register={registerField}
				id="secondary-auxiliary"
			/>
			<Footer icon={icon} register={registerField}>
				<Barcode format={barcode?.format} fallbackShape="square" />
			</Footer>
		</>
	);
}
