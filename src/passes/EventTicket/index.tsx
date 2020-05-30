import * as React from "react";
import { PassProps, InteractionConsumer } from "../PassCore";
import { PassHeader } from "../Areas/Header";
import ThumbnailPrimaryField from "../Areas/PrimaryFields/Thumbnail";
import FieldsRow from "../Areas/FieldRow";
import StripPrimaryFields from "../Areas/PrimaryFields/Strip";
import Footer from "../Areas/Footer";
import Barcodes from "../Areas/components/Barcodes";
import { InteractionContext } from "../PassCore/interactionContext";
import useAlternativesRegistration from "../PassCore/useAlternativesRegistration";

export interface EventTicketProps extends PassProps { }

type PrimaryFieldPropsKind = Parameters<(typeof StripPrimaryFields | typeof ThumbnailPrimaryField)>[0]

export function EventTicket(props: EventTicketProps): JSX.Element {
	useAlternativesRegistration(props.registerAlternatives, {
		name: "With background image",
		specificProps: {
			backgroundImage: null,
		},
	}, {
		name: "With strip image",
		specificProps: {
			stripImage: null,
		},
	});

	const { secondaryFields, primaryFields, headerFields, auxiliaryFields, barcode, logoText, logo } = props;

	let FieldsFragment: (interaction: InteractionContext) => React.ReactElement<PrimaryFieldPropsKind>;

	const SecondaryFieldRow = ({ onFieldSelect, registerField }: InteractionContext) => (
		<FieldsRow
			elements={secondaryFields}
			maximumElementsAmount={4}
			onClick={onFieldSelect}
			register={registerField}
			id="secondaryFields"
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

	/** We fallback to strip image model if none of the required property is available */
	if (props.hasOwnProperty("stripImage") || !props.hasOwnProperty("backgroundImage")) {
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<>
				<StripPrimaryFields
					stripSrc={props.stripImage}
					fields={primaryFields}
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

	} else if (props.hasOwnProperty("backgroundImage")) {
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<ThumbnailPrimaryField
				thumbnailSrc={props.thumbnailImage}
				fields={primaryFields}
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
						headerFields={headerFields}
						logoText={logoText}
						logo={logo}
						onClick={onFieldSelect}
						register={registerField}
					/>
					{FieldsFragment({ onFieldSelect, registerField })}
					<FieldsRow
						id="auxiliaryFields"
						maximumElementsAmount={4}
						elements={auxiliaryFields}
						onClick={onFieldSelect}
						register={registerField}
					/>
					<Footer>
						<Barcodes
							format={barcode?.format}
							fallbackShape="square"
						/>
					</Footer>
				</>
			)}
		</InteractionConsumer>
	);
}
