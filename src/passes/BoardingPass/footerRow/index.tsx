import * as React from "react";
import ImageField, { ImageFieldProps } from "../../Components/ImageField";
import Barcode, { BarcodeProps } from "../../Components/Barcodes";
import "./style.less";
import { PKBarcodeFormat } from "../../constants";

interface FooterProps {
	footerImage?: Omit<ImageFieldProps, "id">,
	barcodeProps?: BarcodeProps;
}

export default (props: FooterProps) => {
	return (
		<div className="footer">
			<ImageField {...props.footerImage} id="footer.image" />
			<Barcode {...props.barcodeProps} fallbackKind="square" />
		</div>
	);
}
