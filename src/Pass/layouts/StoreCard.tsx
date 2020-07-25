import * as React from "react";
import { PassMixedProps, InteractionConsumer } from "..";
import { PassHeader } from "./sections/Header";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import useAlternativesRegistration from "../useAlternativesRegistration";

export interface StoreCardProps extends PassMixedProps { }

export function StoreCard(props: StoreCardProps): JSX.Element {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "StoreCard",
		specificProps: {}
	});

	const { secondaryFields, primaryFields, headerFields, auxiliaryFields, barcode, logo, logoText } = props;

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						logo={logo}
						logoText={logoText}
						headerFields={headerFields}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<StripPrimaryFields
						stripSrc={props.stripImage}
						fields={primaryFields}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{/*
						{
							fieldKey: "starting_point",
							value: "21,75 USD",
							label: "remaining balance"
						}
					*/}
					<FieldsRow
						id="secondary-auxiliary"
						// @TODO: this component, as is,
						// might not be fully correct because 4 fields
						// get rendered in two columns. We don't have
						// an example of a coupon / store card with
						// more than two fields.
						elements={[...(secondaryFields || []), ...(auxiliaryFields || [])]}
						// @TODO - Coupons can have up to 4 fields if
						// barcode is a square barcode
						maximumElementsAmount={-1}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{/* {
						"fieldKey": "deal",
						"label": "Deal of the Day",
						"value": "Lemons"
					}, {
						"fieldKey": "deal",
						"label": "Deal of the Day",
						"value": "Lemons"
					}, {
						"fieldKey": "deal",
						"label": "Deal of the Day",
						"value": "Lemons"
					}, {
						"fieldKey": "deal",
						"label": "Deal of the Day",
						"value": "Lemons"
					} */}
					<Footer>
						<Barcodes format={barcode?.format} fallbackShape="rect" />
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
