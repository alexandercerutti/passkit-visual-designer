import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";
import InteractionContext from "../InteractionContext";
import { useRegistrations } from "./sections/useRegistrations";
import { FieldKind } from "../../model";

type StoreCardProps = PassMixedProps & AlternativesRegistrationSignature;

export function StoreCard(props: StoreCardProps): JSX.Element {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "StoreCard",
		specificProps: {}
	});

	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logo,
		logoText,
		stripImage
	} = props;

	const { onFieldSelect, registerField } = React.useContext(InteractionContext);

	return (
		<>
			<PassHeader
				logo={logo}
				logoText={logoText}
				headerFields={headerFields}
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
				onClick={onFieldSelect}
				register={registerField}
			/>
			<Footer>
				<Barcodes format={barcode?.format} fallbackShape="rect" />
			</Footer>
		</>
	);
}
