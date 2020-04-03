import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Components/Header";
import StripPrimaryFields from "../Components/PrimaryFields/Strip";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";
import Barcodes from "../Components/Barcodes";

export interface StoreCardProps extends PassProps { }

export function StoreCard(props: StoreCardProps): JSX.Element {
	React.useEffect(() => {
		if (props.registerAlternatives) {
			props.registerAlternatives({
				name: "StoreCard",
				specificProps: {}
			});
		}
	}, []);

	const { secondaryFields, primaryFields, headerData, auxiliaryFields, barcode } = props;

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						src={headerData && headerData.logoSrc}
						headerFieldsData={headerData && headerData.fields}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<StripPrimaryFields
						stripSrc={props.stripImage}
						primaryFieldsData={primaryFields}
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
						areaIdentifier="secondary-auxiliary"
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
						<Barcodes format={barcode && barcode.format} fallbackShape="rect" />
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
