import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "./components/Barcodes";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import InteractionContext, { InteractionContextMethods } from "../InteractionContext";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";
import { useRegistrations } from "./sections/useRegistrations";
import { FieldKind } from "../../model";

type GenericProps = PassMixedProps & AlternativesRegistrationSignature;

export function Generic(props: GenericProps): JSX.Element {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "With rectangular barcode",
		specificProps: {
			barcode: {
				format: PKBarcodeFormat.Rectangle
			},
		}
	}, {
		name: "With square barcode",
		specificProps: {
			barcode: {
				format: PKBarcodeFormat.Square
			}
		}
	});

	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logoText,
		logo,
		thumbnailImage
	} = props;

	const { onFieldSelect, registerField } = React.useContext(InteractionContext);

	const isSquaredBarcode = isSquareBarcode(barcode?.format);

	const middleFragment = isSquaredBarcode &&
		(
			<FieldsRow
				elements={[...secondaryFields, ...auxiliaryFields]}
				maximumElementsAmount={4}
				onClick={onFieldSelect}
				register={registerField}
				id="secondary-auxiliary"
			/>
		) || (
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
				withSeparator
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
			<Footer>
				<Barcodes
					fallbackShape={isSquaredBarcode ? "square" : "rect"}
					format={barcode?.format}
				/>
			</Footer>
		</>
	);
}
