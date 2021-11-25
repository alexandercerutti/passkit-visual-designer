import { PassFields, PKTransitType, WalletPassFormat } from "./constants";
import { PassKind } from "./PassKind";

export { default as PKPassView } from "./Pass";
export { default as InteractionContext } from "./InteractionContext";
export {
	PKBarcodeFormat,
	PKTransitType,
	PKDataDetectorType,
	PKDateStyle,
	PKEventType,
	PKNumberStyle,
	PKTextAlignment,
	PassField,
	PassFields,
	SemanticTags,
	SemanticTagTypes,
} from "./constants";

export interface PassMixedProps extends PassMediaProps {
	kind?: PassKind;
	headerFields?: PassFields.HeaderFields[];
	secondaryFields?: PassFields.SecondaryFields[];
	primaryFields?: PassFields.PrimaryFields[];
	auxiliaryFields?: PassFields.AuxiliaryFields[];
	backFields?: PassFields.BackFields[];
	barcode?: Partial<WalletPassFormat.Barcodes>; // @TODO check if an array should be used instead
	transitType?: PKTransitType;
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
