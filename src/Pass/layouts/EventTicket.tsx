import * as React from "react";
import { InteractionConsumer, PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import FieldsRow from "./sections/FieldRow";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import { InteractionContext } from "../interactionContext";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";

type EventTicketProps = PassMixedProps & AlternativesRegistrationSignature;

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

	const {
		secondaryFields = [],
		primaryFields = [],
		headerFields = [],
		auxiliaryFields = [],
		barcode,
		logoText,
		logo,
		stripImage,
		thumbnailImage
	} = props;

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

	/** We fallback to strip image model if none of the required property is available */
	if (props.hasOwnProperty("stripImage") || !props.hasOwnProperty("backgroundImage")) {
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<>
				<StripPrimaryFields
					stripSrc={stripImage}
					fields={primaryFields}
					onClick={onFieldSelect}
					register={registerField}
				/>
				{SecondaryFieldRow({ onFieldSelect, registerField })}
			</>
		);
	} else if (props.hasOwnProperty("backgroundImage")) {
		FieldsFragment = ({ onFieldSelect, registerField }) => (
			<ThumbnailPrimaryField
				thumbnailSrc={thumbnailImage}
				fields={primaryFields}
				onClick={onFieldSelect}
				register={registerField}
			>
				{SecondaryFieldRow({ onFieldSelect, registerField })}
			</ThumbnailPrimaryField>
		);
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
