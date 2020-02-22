import * as React from "react";
import { PKBarcodeFormat } from "../../constants";
import QRCode from "./qr-code";
import Code128 from "./code128";
import PDF417 from "./pdf417";
import Aztec from "./aztec";
import { EmptyBarcode, EmptySquareCode } from "./empty";
import "./style.less";
import { concatClassNames } from "../../utils";

export interface BarcodeProps {
	format: PKBarcodeFormat;
	fallbackKind: "square" | "rect";

	// @TODO
	QRMessage?: string;
	expiredOrVoid?: boolean;
}

export default (props: BarcodeProps) => {
	const component: JSX.Element = selectComponentFromFormat(props.format, props.fallbackKind);

	if (!component) {
		return null;
	}

	const className = concatClassNames("barcode", props.format, props.fallbackKind);

	return (
		<div className={className}>
			<div>
				{component}
			</div>
		</div>
	);
};

function selectComponentFromFormat(format: PKBarcodeFormat, fallbackFormat: "square" | "rect") {
	switch (format) {
		case PKBarcodeFormat.Aztec:
			return <Aztec />;
		case PKBarcodeFormat.Code128:
			return <Code128 />;
		case PKBarcodeFormat.PDF417:
			return <PDF417 />;
		case PKBarcodeFormat.QR:
			return <QRCode />;
		default:
			if (fallbackFormat === "square") {
				return <EmptySquareCode />
			}

			return <EmptyBarcode />
	}
}
