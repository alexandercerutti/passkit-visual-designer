import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Components/Header";
import ThumbnailPrimaryField from "../Components/PrimaryFields/Thumbnail";
import FieldsRow from "../Components/FieldRow";
import StripPrimaryFields from "../Components/PrimaryFields/Strip";
import Footer from "../Components/Footer";
import Barcodes from "../Components/Barcodes";
import { PKBarcodeFormat } from "../constants";
import { InteractionContext } from "../PassCore/interactionContext";

export interface EventTicketProps extends PassProps {
	subkind?: EventTicketKind;
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
				},
				default: true,
			}, {
				name: "With strip image",
				specificProps: {
					subkind: EventTicketKind.STRIP
				}
			});
		}
	}, []);

	const { secondaryFields, primaryFields, headerData, auxiliaryFields, barcode } = props;

	let FieldsFragment: (interaction: InteractionContext) => React.ReactElement<PrimaryFieldPropsKind>;

	const SecondaryFieldRow = ({ onFieldSelect, registerField }: InteractionContext) => (
		<FieldsRow
			areaIdentifier="secondaryFields"
			elements={secondaryFields}
			maximumElementsAmount={4}
			onClick={onFieldSelect}
			register={registerField}
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

	if (props.subkind === EventTicketKind.STRIP) {
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<>
				<StripPrimaryFields
					stripSrc={props.src}
					primaryFieldsData={primaryFields}
					onClick={onFieldSelect}
					register={registerField}
				/>
				{SecondaryFieldRow({ onFieldSelect, registerField })}
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
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<ThumbnailPrimaryField
				thumbnailSrc={props.src}
				primaryFieldsData={primaryFields}
				onClick={onFieldSelect}
				register={registerField}
			>
				{SecondaryFieldRow({ onFieldSelect, registerField })}
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
		<InteractionConsumer>
			{({ onFieldSelect, registerField }) => (
				<>
					<PassHeader
						headerFieldsData={headerData && headerData.fields}
						content={headerData && headerData.logoText}
						src={headerData && headerData.logoSrc}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{FieldsFragment({ onFieldSelect, registerField })}
					<FieldsRow
						areaIdentifier="auxiliaryFields"
						maximumElementsAmount={4}
						elements={auxiliaryFields}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<Footer>
						<Barcodes
							format={barcode && barcode.format}
							fallbackKind="square"
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
