import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import { PKTransitType, PKBarcodeFormat } from "../constants";
import PrimaryFields from "./primaryFields";
import FieldsRow from "../Components/FieldRow";
import Footer from "./footerRow";

interface BoardingPassProps extends PassProps {
	subKind: PKTransitType;
}

export default class BoardingPass extends React.Component<BoardingPassProps> {
	constructor(props: BoardingPassProps) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<>
				<PassHeader
					headerFieldsData={[]}
					onSelect={(id: string) => console.log("Selected", id)}
					register={(kind, id) => true}

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
					subkind={this.props.subKind || PKTransitType.Generic}
					primaryFieldsData={[]}
					onSelect={(id: string) => console.log("Selected", id)}
					register={(kind, id) => true}

				/**
				 * {
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
					elements={[]}

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
					elements={[]}
				/**
				 * 	{
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
				<Footer footerImage={{}} barcodeProps={{ format: PKBarcodeFormat.QR, fallbackKind: "square" }} />
			</>
		);
	}
}
