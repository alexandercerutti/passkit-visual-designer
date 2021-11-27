import { Pass } from "@pkvd/passkit-types";
import { PassKind } from "./PassKind";

export { default as PKPassElement } from "./Pass";
export type { PassProps } from "./Pass";
export { PassKind } from "./PassKind";
export * as PKPassLayout from "./layouts";
export { default as InteractionContext } from "./InteractionContext";

// @TODO convert to Pass namespace
export interface PassMixedProps extends PassMediaProps, Partial<Pass.PassFields> {
	kind?: PassKind;
	barcode?: Partial<Pass.Barcodes>; // @TODO check if an array should be used instead
	transitType?: Pass.PKTransitType;
	logoText?: string;
	backgroundColor?: string;
	foregroundColor?: string;
	labelColor?: string;
	description?: string;
	passTeamIdentifier?: string;
	serialNumber?: string;
	organizationName?: string;
	passTypeIdentifier?: string;
	teamIdentifier?: string;
	formatVersion?: 1;
	groupingIdentifier?: string;
	webServiceURL?: string;
	authenticationToken?: string;
	associatedStoreIdentifiers?: string;
	appLaunchURL?: string;
}

/**
 * This interface includes urls from redux middleware
 */
export interface PassMediaProps {
	logo?: string;
	backgroundImage?: string;
	thumbnailImage?: string;
	stripImage?: string;
	icon?: string;
	footerImage?: string;
}
