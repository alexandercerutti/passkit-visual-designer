import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Areas/Header";
import StripPrimaryFields from "../Areas/PrimaryFields/Strip";
import FieldsRow from "../Areas/FieldRow";
import Barcode from "../Areas/components/Barcodes";
import Footer from "../Areas/Footer";
import useAlternativesRegistration from "../PassCore/useAlternativesRegistration";

export interface CouponProps extends PassProps { }

export function Coupon(props: CouponProps): JSX.Element {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "Coupon Pass",
		specificProps: {}
	});

	const { secondaryFields, primaryFields, headerFields, auxiliaryFields, barcode, stripImage, logo, logoText } = props;

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
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
						id={"primaryFields"}
					/>
					{/*
						{
							fieldKey: "starting_point",
							value: "21,75 USD",
							label: "remaining balance"
						}
					*/}
					<FieldsRow
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
						id="secondary-auxiliary"
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
						<Barcode
							format={barcode?.format}
							fallbackShape="square"
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
