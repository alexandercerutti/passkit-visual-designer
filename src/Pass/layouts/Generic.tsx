import * as React from "react";
import { PassMixedProps, InteractionConsumer } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "./components/Barcodes";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import { InteractionContext } from "../interactionContext";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";
import useObjectURL from "../../useObjectURL";

export interface GenericProps extends PassMixedProps, AlternativesRegistrationSignature { }

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

	const thumbnailImageURL = useObjectURL(thumbnailImage, { type: "image/*" });
	const logoURL = useObjectURL(logo);

	const isSquaredBarcode = isSquareBarcode(barcode?.format);

	const MiddleFragment = ({ onFieldSelect, registerField }: InteractionContext) => isSquaredBarcode &&
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
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						withSeparator
						headerFields={headerFields}
						logo={logoURL}
						logoText={logoText}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<ThumbnailPrimaryField
						fields={primaryFields}
						thumbnailSrc={thumbnailImageURL}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{MiddleFragment({ onFieldSelect, registerField })}
					<Footer>
						<Barcodes
							fallbackShape={isSquaredBarcode ? "square" : "rect"}
							format={barcode?.format}
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
