import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import { PKTransitType, PKBarcodeFormat } from "../constants";
import PrimaryFields from "./primaryFields";
import FieldsRow from "../Components/FieldRow";
import Footer from "../Components/Footer";
import { FieldKind } from "../../model";
import ImageField from "../Components/ImageField";
import Barcode from "../Components/Barcodes";

interface BoardingPassProps extends Omit<PassProps, "onClick"> {
	subKind: PKTransitType;
}

function fakeRegister(kind: FieldKind, id: string) {
	console.log("registering", kind, id);
	return true;
}

export default function BoardingPass(props: BoardingPassProps) {
	return (
		<>
			<PassHeader
				withSeparator
				headerFieldsData={[]}
				onClick={(id: string) => console.log("Selected", id)}
				register={fakeRegister}

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
				subkind={props.subKind || PKTransitType.Generic}
				primaryFieldsData={[]}
				onClick={(id: string) => console.log("Selected", id)}
				register={fakeRegister}

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
				elements={[]}
				onClick={(id: string) => console.log("Selected", id)}
				register={fakeRegister}

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
				onClick={(id: string) => console.log("Selected", id)}
				register={fakeRegister}
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
					onClick={(id: string) => console.log("Selected", id)}
					register={fakeRegister}
					id="footer.image"
				/>
				<Barcode format={PKBarcodeFormat.None} fallbackKind="rect" />
			</Footer>
		</>
	);
}
