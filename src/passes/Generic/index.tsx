import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Areas/Header";
import ThumbnailPrimaryField from "../Areas/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "../Areas/components/Barcodes";
import FieldsRow from "../Areas/FieldRow";
import Footer from "../Areas/Footer";
import { InteractionContext } from "../PassCore/interactionContext";
import useAlternativesRegistration from "../PassCore/useAlternativesRegistration";

export interface GenericProps extends PassProps { }

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

	const { secondaryFields, primaryFields, headerFields, auxiliaryFields, barcode, logoText, logo } = props;

	const isSquaredBarcode = isSquareBarcode(barcode?.format);

	const MiddleFragment = ({ onFieldSelect, registerField }: InteractionContext) => isSquaredBarcode &&
		(
			<FieldsRow
				elements={[...(secondaryFields || []), ...(auxiliaryFields || [])]}
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
						logo={logo}
						logoText={logoText}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<ThumbnailPrimaryField
						fields={primaryFields}
						thumbnailSrc={props.thumbnailImage}
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
