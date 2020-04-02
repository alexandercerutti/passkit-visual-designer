import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Components/Header";
import ThumbnailPrimaryField from "../Components/PrimaryFields/Thumbnail";
import { PKBarcodeFormat } from "../constants";
import Barcodes, { isSquareBarcode } from "../Components/Barcodes";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";
import { InteractionContext } from "../PassCore/interactionContext";

export interface GenericProps extends PassProps { }

export function Generic(props: GenericProps): JSX.Element {
	React.useEffect(() => {
		if (props.registerAlternatives) {
			props.registerAlternatives({
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
		}
	}, []);

	const { secondaryFields, primaryFields, headerData, auxiliaryFields, barcode } = props;

	const isSquaredBarcode = isSquareBarcode(barcode && barcode.format);

	const MiddleFragment = ({ onFieldSelect, registerField }: InteractionContext) => isSquaredBarcode &&
		(
			<FieldsRow
				areaIdentifier="secondary-auxiliary"
				elements={[...(secondaryFields || []), ...(auxiliaryFields || [])]}
				maximumElementsAmount={4}
				onClick={onFieldSelect}
				register={registerField}
			/>
		) || (
			<>
				<FieldsRow
					areaIdentifier="secondaryFields"
					elements={secondaryFields}
					maximumElementsAmount={4}
					onClick={onFieldSelect}
					register={registerField}
				/>
				<FieldsRow
					areaIdentifier="auxiliaryFields"
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
						headerFieldsData={headerData && headerData.fields}
						src={headerData && headerData.logoSrc}
						content={headerData && headerData.logoText}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<ThumbnailPrimaryField
						primaryFieldsData={primaryFields}
						thumbnailSrc={props.thumbnailImage}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{MiddleFragment({ onFieldSelect, registerField })}
					<Footer>
						<Barcodes
							fallbackKind={isSquaredBarcode ? "square" : "rect"}
							format={barcode && barcode.format}
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
