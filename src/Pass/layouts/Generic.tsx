import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import Barcodes, { isSquareBarcode } from "./components/Barcodes";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import InteractionContext from "../InteractionContext";

export default function Generic(props: PassMixedProps): JSX.Element {
	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logoText,
		logo,
		thumbnailImage,
		icon,
	} = props;

	const { onFieldSelect, registerField } = React.useContext(InteractionContext);

	const isSquaredBarcode = isSquareBarcode(barcode?.format);

	const middleFragment = (isSquaredBarcode && (
		<FieldsRow
			elements={[...secondaryFields, ...auxiliaryFields]}
			maximumElementsAmount={4}
			onClick={onFieldSelect}
			register={registerField}
			id="secondary-auxiliary"
		/>
	)) || (
		<>
			<FieldsRow
				id="secondaryFields"
				elements={secondaryFields}
				maximumElementsAmount={4}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<FieldsRow
				id="auxiliaryFields"
				elements={auxiliaryFields}
				maximumElementsAmount={4}
				onClick={onFieldSelect}
				register={registerField}
			/>
		</>
	);

	return (
		<>
			<PassHeader
				headerFields={headerFields}
				logo={logo}
				logoText={logoText}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<ThumbnailPrimaryField
				fields={primaryFields}
				thumbnailSrc={thumbnailImage}
				onClick={onFieldSelect}
				register={registerField}
			/>
			{middleFragment}
			<Footer icon={icon} register={registerField}>
				<Barcodes fallbackShape={isSquaredBarcode ? "square" : "rect"} format={barcode?.format} />
			</Footer>
		</>
	);
}
