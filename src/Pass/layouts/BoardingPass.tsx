import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import PrimaryFields from "./sections/PrimaryFields/Travel";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcode from "./components/Barcodes";
import InteractionContext from "../InteractionContext";

export default function BoardingPass(props: PassMixedProps) {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		transitType,
		logo,
		logoText,
		footerImage,
		icon,
	} = props;

	const { onFieldSelect, registerField } = React.useContext(InteractionContext);

	return (
		<>
			<PassHeader
				logo={logo}
				logoText={logoText}
				headerFields={headerFields}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<PrimaryFields
				transitType={transitType}
				fields={primaryFields}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<FieldsRow
				maximumElementsAmount={5}
				elements={auxiliaryFields}
				onClick={onFieldSelect}
				register={registerField}
				id="auxiliaryFields"
			/>
			<FieldsRow
				maximumElementsAmount={4}
				elements={secondaryFields}
				onClick={onFieldSelect}
				register={registerField}
				id="secondaryFields"
			/>
			<Footer allowFooterImage icon={icon} register={registerField} src={footerImage}>
				<Barcode format={barcode?.format} fallbackShape="rect" />
			</Footer>
		</>
	);
}
