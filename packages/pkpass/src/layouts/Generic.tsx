import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import { ThumbnailPrimaryFields } from "./sections/PrimaryFields";
import Barcodes, { isSquareBarcode } from "./components/Barcodes";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";

export default function Generic(props: Partial<PassMixedProps>): JSX.Element {
	const {
		generic: {
			secondaryFields = [],
			primaryFields = [],
			headerFields = [],
			auxiliaryFields = [],
		} = {},
		barcodes,
		logoText,
		logo,
		thumbnailImage,
		icon,
	} = props;

	const isSquaredBarcode = isSquareBarcode(barcodes?.[0].format);

	const middleFragment = (isSquaredBarcode && (
		<FieldsRow
			elements={[...secondaryFields, ...auxiliaryFields]}
			maximumElementsAmount={4}
			id="secondary-auxiliary"
		/>
	)) || (
		<>
			<FieldsRow id="secondaryFields" elements={secondaryFields} maximumElementsAmount={4} />
			<FieldsRow id="auxiliaryFields" elements={auxiliaryFields} maximumElementsAmount={4} />
		</>
	);

	return (
		<>
			<PassHeader headerFields={headerFields} logo={logo} logoText={logoText} />
			<ThumbnailPrimaryFields fields={primaryFields} thumbnailSrc={thumbnailImage} />
			{middleFragment}
			<Footer icon={icon}>
				<Barcodes
					fallbackShape={isSquaredBarcode ? "square" : "rect"}
					format={barcodes?.[0].format}
				/>
			</Footer>
		</>
	);
}
