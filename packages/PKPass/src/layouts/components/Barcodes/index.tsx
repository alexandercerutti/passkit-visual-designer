import * as React from "react";
import { Pass } from "@pkvd/passkit-types";
import QRCode from "./qr-code";
import Code128 from "./code128";
import PDF417 from "./pdf417";
import Aztec from "./aztec";
import { EmptyBarcode, EmptySquareCode } from "./empty";
import "./style.less";
import { createClassName } from "../../../../../../src/utils";

interface BarcodeProps extends Partial<Pass.Barcodes> {
	fallbackShape: "square" | "rect";

	// @TODO
	voided?: boolean;
}

export default function Barcodes(props: BarcodeProps) {
	const barcodeFormat = props.format || Pass.PKBarcodeFormat.None;
	const BarcodeComponent = selectComponentFromFormat(barcodeFormat, props.fallbackShape);

	if (!BarcodeComponent) {
		return null;
	}

	const className = createClassName(["barcode", barcodeFormat, props.fallbackShape], {
		content: barcodeFormat !== Pass.PKBarcodeFormat.None && props.message,
	});

	return (
		<div className={className}>
			<div>
				<BarcodeComponent />
				{(props.format && props.message) ?? null}
			</div>
		</div>
	);
}

export function isSquareBarcode(kind: Pass.PKBarcodeFormat) {
	return (
		kind === Pass.PKBarcodeFormat.Square ||
		kind === Pass.PKBarcodeFormat.QR ||
		kind === Pass.PKBarcodeFormat.Aztec
	);
}

export function isRectangularBarcode(kind: Pass.PKBarcodeFormat) {
	return (
		kind === Pass.PKBarcodeFormat.Rectangle ||
		kind === Pass.PKBarcodeFormat.Code128 ||
		kind === Pass.PKBarcodeFormat.PDF417
	);
}

function selectComponentFromFormat(
	format: Pass.PKBarcodeFormat,
	fallbackFormat: "square" | "rect"
) {
	switch (format) {
		case Pass.PKBarcodeFormat.Aztec:
			return Aztec;
		case Pass.PKBarcodeFormat.Code128:
			return Code128;
		case Pass.PKBarcodeFormat.PDF417:
			return PDF417;
		case Pass.PKBarcodeFormat.QR:
			return QRCode;
		default:
			if (fallbackFormat === "square") {
				return EmptySquareCode;
			}

			return EmptyBarcode;
	}
}
