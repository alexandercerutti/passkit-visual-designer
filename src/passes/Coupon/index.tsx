import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import PrimaryFields from "./primaryFields";
import FieldsRow from "../Components/FieldRow";
import Barcode from "../Components/Barcodes";
import { PKBarcodeFormat } from "../constants";
import Footer from "../Components/Footer";

interface CouponProps extends PassProps {

}

export function Coupon(props: CouponProps): JSX.Element {
	return (
		<>
			<PassHeader />
			<PrimaryFields
				primaryFieldsData={[]}
			/>
			{/* 			{
					fieldKey: "starting_point",
					value: "21,75 USD",
					label: "remaining balance"
				} */}
			<FieldsRow
				areaIdentifier="secondary-auxiliary"
				// @TODO: this component, as is,
				// might not be fully correct because 4 fields
				// get rendered in two columns. We don't have
				// an example of a coupon / store card with
				// more than two fields.
				elements={[]}
				// @TODO - Coupons can have up to 4 fields if
				// barcode is a square barcode
				maximumElementsAmount={-1}
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
				<Barcode format={PKBarcodeFormat.None} fallbackKind="square" />
			</Footer>
		</>
	);
}
