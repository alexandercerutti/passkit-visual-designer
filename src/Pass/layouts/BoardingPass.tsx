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

	const { secondaryFields, primaryFields, headerFields, auxiliaryFields, barcode, transitType, logo, logoText } = props;

	const logoURL = useObjectURL(logo);

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						withSeparator
						logo={logoURL}
						logoText={logoText || undefined}
						headerFields={headerFields}
						onClick={onFieldSelect}
						register={registerField}

					/**
						{
							label: "Data",
							key: "departing_date",
							value: "10/04/1996",
						}, {
							label: "Ora",
							key: "departing_time",
							value: "10:30",
						}, {
							label: "test",
							key: "departing_time",
							value: "10:30",
						}
						*/
					/>
					<PrimaryFields
						transitType={transitType}
						// fields={primaryFields}
						onClick={onFieldSelect}
						register={registerField}
						fields={[
							{
								key: "starting_point",
								value: "ARN",
								label: "stockholm-arlanda"
							}, {
								key: "finish_point",
								value: "CPH",
								label: "copenhagen t2"
							}
						]}

					/**
					{
						key: "starting_point",
						value: "ARN",
						label: "stockholm-arlanda"
					}, {
						key: "finish_point",
						value: "CPH",
						label: "copenhagen t2"
					}
						*/

					/>
					<FieldsRow
						maximumElementsAmount={5}
						// elements={auxiliaryFields}
						onClick={onFieldSelect}
						register={registerField}
						id="auxiliaryFields"
						elements={[
							{
								key: "passenger",
								label: "passeggero",
								value: "Alexander Patrick Cerutti"
							},
							{
								key: "flight",
								label: "n. volo",
								value: "FR1328"
							},
							{
								key: "seq",
								label: "sequenza",
								value: "8"
							}
						]}

					/**
						{
							key: "passenger",
							label: "passeggero",
							value: "Alexander Patrick Cerutti"
						},
						{
							key: "flight",
							label: "n. volo",
							value: "FR1328"
						},
						{
							key: "seq",
							label: "sequenza",
							value: "8"
						}
						*/
					/>
					<FieldsRow
						maximumElementsAmount={4}
						elements={secondaryFields}
						onClick={onFieldSelect}
						register={registerField}
						id="secondaryFields"
					/**
						{
							"key": "gateClose",
							"label": "Il Gate Chiude",
							"dateStyle": PKDateStyle.None,
							"timeStyle": PKDateStyle.Short,
							"value": "09:20"
						},
						{
							"key": "queue",
							"label": "Fila",
							"value": "Priorità"
						},
						{
							"key": "seat",
							"label": "Posto*",
							"value": "16C"
						}
						*/
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
