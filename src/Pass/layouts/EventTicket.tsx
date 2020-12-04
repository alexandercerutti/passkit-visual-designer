import * as React from "react";
import { PassMixedProps } from "..";
import { PassHeader } from "./sections/Header";
import ThumbnailPrimaryField from "./sections/PrimaryFields/Thumbnail";
import FieldsRow from "./sections/FieldRow";
import StripPrimaryFields from "./sections/PrimaryFields/Strip";
import Footer from "./sections/Footer";
import Barcodes from "./components/Barcodes";
import InteractionContext, { InteractionContextMethods } from "../InteractionContext";
import useAlternativesRegistration from "../useAlternativesRegistration";
import type { AlternativesRegistrationSignature } from "../useAlternativesRegistration";
import { useRegistrations } from "./sections/useRegistrations";
import { FieldKind } from "../../model";

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
		icon,
		stripImage,
		thumbnailImage
	} = props;

	let fieldsFragment: React.ReactElement<PrimaryFieldPropsKind>;

	const SecondaryFieldRow = ({ onFieldSelect, registerField }: InteractionContextMethods) => (
		<FieldsRow
			elements={secondaryFields}
			maximumElementsAmount={4}
			onClick={onFieldSelect}
			register={registerField}
			id="secondaryFields"
		/>
	);

	const context = React.useContext(InteractionContext);
	const { onFieldSelect, registerField } = context;

	/** We fallback to strip image model if none of the required property is available */
	if (props.hasOwnProperty("stripImage") || !props.hasOwnProperty("backgroundImage")) {
		fieldsFragment = (
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
		if (Object.keys(context).length) {
			useRegistrations(context.registerField, [
				[FieldKind.IMAGE, "backgroundImage"]
			]);
		}

		fieldsFragment = (
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
		<>
			<PassHeader
				headerFields={headerFields}
				logoText={logoText}
				logo={logo}
				onClick={onFieldSelect}
				register={registerField}
			/>
			{fieldsFragment}
			<FieldsRow
				id="auxiliaryFields"
				maximumElementsAmount={4}
				elements={auxiliaryFields}
				onClick={onFieldSelect}
				register={registerField}
			/>
			<Footer
				icon={icon}
				register={registerField}
			>
				<Barcodes
					format={barcode?.format}
					fallbackShape="square"
				/>
			</Footer>
		</>
	);
}
