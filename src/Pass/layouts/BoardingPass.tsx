import * as React from "react";
import { PassMixedProps, InteractionConsumer } from "..";
import { PassHeader } from "./sections/Header";
import { PKTransitType } from "../constants";
import PrimaryFields from "./sections/PrimaryFields/Travel";
import FieldsRow from "./sections/FieldRow";
import Footer from "./sections/Footer";
import Barcode from "./components/Barcodes";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";
import useObjectURL from "../../useObjectURL";

export interface BoardingPassProps extends PassMixedProps, AlternativesRegistrationSignature { }

export function BoardingPass(props: BoardingPassProps) {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "Generic Boarding Pass",
		specificProps: {
			transitType: PKTransitType.Generic
		}
	}, {
		name: "Air Boarding Pass",
		specificProps: {
			transitType: PKTransitType.Air
		}
	}, {
		name: "Boat Boarding Pass",
		specificProps: {
			transitType: PKTransitType.Boat
		}
	}, {
		name: "Bus Boarding Pass",
		specificProps: {
			transitType: PKTransitType.Bus
		}
	}, {
		name: "Train Boarding Pass",
		specificProps: {
			transitType: PKTransitType.Train
		}
	});

	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		transitType,
		logo,
		logoText
	} = props;

	const logoURL = useObjectURL(logo);

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						withSeparator
						logo={logoURL}
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
					<Footer allowFooterImage register={registerField}>
						<Barcode
							format={barcode?.format}
							fallbackShape="rect"
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
