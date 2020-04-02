import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Components/Header";
import { PKTransitType } from "../constants";
import PrimaryFields from "../Components/PrimaryFields/Travel";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";
import ImageField from "../Components/ImageField";
import Barcode from "../Components/Barcodes";

export interface BoardingPassProps extends PassProps { }

export function BoardingPass(props: BoardingPassProps) {
	React.useEffect(() => {
		if (props.registerAlternatives) {
			props.registerAlternatives({
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
		}
	}, []);

	const { secondaryFields, primaryFields, headerData, auxiliaryFields, barcode, transitType } = props;

	return (
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						withSeparator
						src={headerData && headerData.logoSrc}
						content={headerData && headerData.logoText || undefined}
						headerFieldsData={headerData && headerData.fields}
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
						primaryFieldsData={primaryFields}
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
						areaIdentifier="auxiliaryFields"
						maximumElementsAmount={-1}
						elements={auxiliaryFields}
						onClick={onFieldSelect}
						register={registerField}

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
						areaIdentifier="secondaryFields"
						maximumElementsAmount={-1}
						elements={secondaryFields}
						onClick={onFieldSelect}
						register={registerField}
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
					<Footer>
						<ImageField
							onClick={onFieldSelect}
							register={registerField}
							id="footer.image"
						/>
						<Barcode
							format={barcode && barcode.format}
							fallbackKind="rect"
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
