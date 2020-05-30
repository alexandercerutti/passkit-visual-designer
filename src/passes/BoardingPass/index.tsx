import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Areas/Header";
import { PKTransitType } from "../constants";
import PrimaryFields from "../Areas/PrimaryFields/Travel";
import FieldsRow from "../Areas/FieldRow";
import Footer from "../Areas/Footer";
import ImageField from "../Areas/components/ImageField";
import Barcode from "../Areas/components/Barcodes";
import useAlternativesRegistration from "../PassCore/useAlternativesRegistration";

export interface BoardingPassProps extends PassProps { }

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

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						withSeparator
						logo={logo}
						logoText={logoText || undefined}
						headerFields={headerFields}
						onClick={onFieldSelect}
						register={registerField}

					/**
						{
							label: "Data",
							fieldKey: "departing_date",
							value: "10/04/1996",
						}, {
							label: "Ora",
							fieldKey: "departing_time",
							value: "10:30",
						}, {
							label: "test",
							fieldKey: "departing_time",
							value: "10:30",
						}
						*/
					/>
					<PrimaryFields
						transitType={transitType}
						fields={primaryFields}
						onClick={onFieldSelect}
						register={registerField}

					/**
					{
						fieldKey: "starting_point",
						value: "ARN",
						label: "stockholm-arlanda"
					}, {
						fieldKey: "finish_point",
						value: "CPH",
						label: "copenhagen t2"
					}
						*/

					/>
					<FieldsRow
						maximumElementsAmount={-1}
						elements={auxiliaryFields}
						onClick={onFieldSelect}
						register={registerField}
						id="auxiliaryFields"

					/**
					 * 	{
							fieldKey: "passenger",
							label: "passeggero",
							value: "Alexander Patrick Cerutti"
						},
						{
							fieldKey: "flight",
							label: "n. volo",
							value: "FR1328"
						},
						{
							fieldKey: "seq",
							label: "sequenza",
							value: "8"
						}
						*/
					/>
					<FieldsRow
						maximumElementsAmount={-1}
						elements={secondaryFields}
						onClick={onFieldSelect}
						register={registerField}
						id="secondaryFields"
					/**
						{
							"fieldKey": "gateClose",
							"label": "Il Gate Chiude",
							"dateStyle": PKDateStyle.None,
							"timeStyle": PKDateStyle.Short,
							"value": "09:20"
						},
						{
							"fieldKey": "queue",
							"label": "Fila",
							"value": "Priorità"
						},
						{
							"fieldKey": "seat",
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
