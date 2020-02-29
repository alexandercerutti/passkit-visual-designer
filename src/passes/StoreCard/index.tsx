import * as React from "react";
import Pass, { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import StripPrimaryFields from "../Components/PrimaryFields/Strip";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";
import Barcodes from "../Components/Barcodes";
import { PKBarcodeFormat } from "../constants";

interface StoreCardProps extends PassProps {
	headerSrc?: string;
	stripSrc?: string;
	barcodeFormat?: PKBarcodeFormat;
}

export function StoreCard(props: StoreCardProps): JSX.Element {
	return (
		<>
			<PassHeader
				src={props.headerSrc}
			/>
			<StripPrimaryFields
				stripSrc={props.stripSrc}
				primaryFieldsData={[]}
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
				<Barcodes format={props.barcodeFormat || PKBarcodeFormat.None} fallbackKind="rect" />
			</Footer>
		</>
	);
}
