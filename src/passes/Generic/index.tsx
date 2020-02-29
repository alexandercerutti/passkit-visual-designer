import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import ThumbnailPrimaryField from "../Components/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "../Components/Barcodes";
import FieldsRow from "../Components/FieldRow";
import { Field } from "../Components/Field";
import Footer from "../Components/Footer";

interface GenericProps extends PassProps {
	thumbnailSrc?: string;
	barcodeFormat?: PKBarcodeFormat;
	secondaryFieldsElements?: Omit<Parameters<typeof Field>[0], "id">[];
	auxiliaryFieldsElements?: Omit<Parameters<typeof Field>[0], "id">[];
}

export function Generic(props: GenericProps): JSX.Element {
	let MiddleFragment = isSquareBarcode(props.barcodeFormat) &&
		(
			<FieldsRow
				areaIdentifier="secondary-auxiliary"
				elements={
					Object.assign({} as typeof props.secondaryFieldsElements,
						props.secondaryFieldsElements || {},
						props.auxiliaryFieldsElements || {}
					)
				}
				maximumElementsAmount={4}
			/>
		) || (
			<>
				<FieldsRow
					areaIdentifier="secondaryFields"
					elements={props.secondaryFieldsElements}
					maximumElementsAmount={4}
				/>
				<FieldsRow
					areaIdentifier="auxiliaryFields"
					elements={props.auxiliaryFieldsElements}
					maximumElementsAmount={4}
				/>
			</>
		);

	return (
		<>
			<PassHeader
				withSeparator
				headerFieldsData={[]}
			/>
			<ThumbnailPrimaryField
				primaryFieldsData={[]}
				thumbnailSrc={props.thumbnailSrc}
			/>
			{MiddleFragment}
			<Footer>
				<Barcodes
					fallbackKind="rect"
					format={props.barcodeFormat || PKBarcodeFormat.None}
				/>
			</Footer>
		</>
	);
}
