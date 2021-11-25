import * as React from "react";
import { PKBarcodeFormat, WalletPassFormat } from "../../../constants";
import QRCode from "./qr-code";
import Code128 from "./code128";
import PDF417 from "./pdf417";
import Aztec from "./aztec";
import { EmptyBarcode, EmptySquareCode } from "./empty";
import "./style.less";
import { createClassName } from "../../../../../../src/utils";

interface BarcodeProps extends Partial<WalletPassFormat.Barcodes> {
	fallbackShape: "square" | "rect";

	// @TODO
	voided?: boolean;
}

export default function Barcodes(props: BarcodeProps) {
	const barcodeFormat = props.format || PKBarcodeFormat.None;
	const BarcodeComponent = selectComponentFromFormat(barcodeFormat, props.fallbackShape);

	if (!BarcodeComponent) {
		return null;
	}

	const className = createClassName(["barcode", barcodeFormat, props.fallbackShape], {
		content: barcodeFormat !== PKBarcodeFormat.None && props.message,
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

export function isSquareBarcode(kind: PKBarcodeFormat) {
	return (
		kind === PKBarcodeFormat.Square || kind === PKBarcodeFormat.QR || kind === PKBarcodeFormat.Aztec
	);
}

export function isRectangularBarcode(kind: PKBarcodeFormat) {
	return (
		kind === PKBarcodeFormat.Rectangle ||
		kind === PKBarcodeFormat.Code128 ||
		kind === PKBarcodeFormat.PDF417
	);
}

function selectComponentFromFormat(format: PKBarcodeFormat, fallbackFormat: "square" | "rect") {
	switch (format) {
		case PKBarcodeFormat.Aztec:
			return Aztec;
		case PKBarcodeFormat.Code128:
			return Code128;
		case PKBarcodeFormat.PDF417:
			return PDF417;
		case PKBarcodeFormat.QR:
			return QRCode;
		default:
			if (fallbackFormat === "square") {
				return EmptySquareCode;
			}

			return EmptyBarcode;
	}
}
