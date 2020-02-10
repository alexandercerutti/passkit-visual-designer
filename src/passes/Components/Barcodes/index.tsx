import * as React from "react";
import { PKBarcodeFormat } from "../../constants";
import QRCode from "./qr-code";
import Code128 from "./code128";
import PDF417 from "./pdf417";
import Aztec from "./aztec";
import "./style.less";

export default (props: { format: PKBarcodeFormat }) => {
	let component: JSX.Element = selectComponentFromFormat(props.format);

	if (!component) {
		return null;
	}

	return (
		<div className={`barcode ${props.format}`}>
			{component}
		</div>
	);
};

function selectComponentFromFormat(format: PKBarcodeFormat) {
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
			return null;
	}
}
