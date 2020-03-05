import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import ThumbnailPrimaryField from "../Components/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "../Components/Barcodes";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";

interface GenericProps extends PassProps {
	thumbnailSrc?: string;
}

enum GenericKind {
	RECTANGULAR_BARCODE,
	SQUARE_BARCODE
}

export function Generic(props: GenericProps): JSX.Element {
	React.useEffect(() => {
		if (props.registerAlternatives) {
			props.registerAlternatives({
				name: "With rectangular barcode",
				specificProps: {
					subkind: GenericKind.RECTANGULAR_BARCODE
				}
			}, {
				name: "With square barcode",
				specificProps: {
					subkind: GenericKind.SQUARE_BARCODE
				}
			});
		}
	}, []);

	const { secondaryFields, primaryFields, headerData, auxiliaryFields, barcode } = props;

	const MiddleFragment = isSquareBarcode(barcode && barcode.format) &&
		(
			<FieldsRow
				areaIdentifier="secondary-auxiliary"
				elements={[...(secondaryFields || []), ...(auxiliaryFields || [])]}
				maximumElementsAmount={4}
			/>
		) || (
			<>
				<FieldsRow
					areaIdentifier="secondaryFields"
					elements={secondaryFields}
					maximumElementsAmount={4}
				/>
				<FieldsRow
					areaIdentifier="auxiliaryFields"
					elements={auxiliaryFields}
					maximumElementsAmount={4}
				/>
			</>
		);

	return (
		<>
			<PassHeader
				withSeparator
				headerFieldsData={headerData && headerData.fields}
				src={headerData && headerData.logoSrc}
				content={headerData && headerData.logoText}
			/>
			<ThumbnailPrimaryField
				primaryFieldsData={primaryFields}
				thumbnailSrc={props.thumbnailSrc}
			/>
			{MiddleFragment}
			<Footer>
				<Barcodes
					fallbackKind="rect"
					format={barcode && barcode.format || PKBarcodeFormat.None}
				/>
			</Footer>
		</>
	);
}
