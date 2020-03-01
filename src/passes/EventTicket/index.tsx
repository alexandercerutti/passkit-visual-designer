import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";
import ThumbnailPrimaryField from "../Components/PrimaryFields/Thumbnail";
import FieldsRow from "../Components/FieldRow";
import StripPrimaryFields from "../Components/PrimaryFields/Strip";
import Footer from "../Components/Footer";
import Barcodes from "../Components/Barcodes";
import { PKBarcodeFormat } from "../constants";

interface EventTicketProps extends PassProps {
	subkind: EventTicketKind;
	imagePosition: "strip" | "background";
	src?: string;
}

export enum EventTicketKind {
	BACKGROUND,
	STRIP
}

type PrimaryFieldPropsKind = Parameters<(typeof StripPrimaryFields | typeof ThumbnailPrimaryField)>[0]

export function EventTicket(props: EventTicketProps): JSX.Element {
	React.useEffect(() => {
		if (props.registerAlternatives) {
			props.registerAlternatives({
				name: "With background image",
				specificProps: {
					subkind: EventTicketKind.BACKGROUND
				}
			}, {
				name: "With strip image",
				specificProps: {
					subkind: EventTicketKind.STRIP
				}
			});
		}
	}, []);

	let FieldsFragment: React.ReactElement<PrimaryFieldPropsKind>;

	const SecondaryFieldRow = (
		<FieldsRow
			areaIdentifier="secondaryFields"
			elements={[]}
			maximumElementsAmount={4}
		/>
	);

	/**
		{
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}, {
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}, {
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}, {
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}, {
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}, {
			"fieldKey": "loc",
			"label": "LOCATION",
			"value": "Moscone West"
		}
	 */

	// const imagePosition = "thumbnail";

	if (props.imagePosition === "strip") {
		FieldsFragment = (
			<>
				<StripPrimaryFields
					stripSrc={props.src}
					primaryFieldsData={[]}
				/>
				{SecondaryFieldRow}
			</>
		);

		/**
		{
			"fieldKey": "event",
			"label": "EVENT",
			"value": "The Beat Goes On"
		}
		 */

	} else {
		FieldsFragment = (
			<ThumbnailPrimaryField
				thumbnailSrc={props.src}
				primaryFieldsData={[]}
			>
				{SecondaryFieldRow}
			</ThumbnailPrimaryField>
		);

		/**
		{
			"fieldKey": "event",
			"label": "EVENT",
			"value": "The Beat Goes On"
		}
		 */
	}

	return (
		<>
			<PassHeader
				headerFieldsData={[]}
				onClick={(id: string) => console.log("Selected", id)}
				register={(kind, id) => true}
			/>
			{FieldsFragment}
			<FieldsRow
				areaIdentifier="auxiliaryFields"
				maximumElementsAmount={4}
				elements={[]}
			/>
			<Footer>
				<Barcodes
					format={PKBarcodeFormat.None}
					fallbackKind="square"
				/>
			</Footer>
		</>
	);
}
