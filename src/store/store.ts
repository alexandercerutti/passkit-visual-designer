import { PassKind } from "../model";
import { Constants, PassMixedProps, MediaProps } from "@pkvd/pass";

const { PKTextAlignment, PKTransitType } = Constants;

/** Webpack defined */
declare const __DEV__: boolean;

const __DEV_DEFAULT_PASS_PROPS = __DEV__
	? {
			transitType: PKTransitType.Boat,
			kind: PassKind.BOARDING_PASS,
			/** FEW TESTING DATA **/
			/**

	backgroundColor: "rgb(255,99,22)",
	labelColor: "rgb(0,0,0)",
	foregroundColor: "rgb(255,255,255)",
	headerFields: [
		{
			key: "num",
			label: "volo",
			value: "EJU996",
			textAlignment: PKTextAlignment.Center,
		},
		{
			key: "date",
			label: "Data",
			value: "21 set",
			textAlignment: PKTextAlignment.Center,
		}
	],
	primaryFields: [
		{
			key: "from",
			label: "Venezia Marco Polo",
			value: "VCE",
			textAlignment: PKTextAlignment.Left,
		},
		{
			key: "to",
			label: "Napoli",
			value: "NAP",
			textAlignment: PKTextAlignment.Right,
		},
	],
	auxiliaryFields: [
		{
			key: "user",
			label: "Passeggero",
			value: "SIG. ALEXANDER PATRICK CERUTTI",
			textAlignment: PKTextAlignment.Left,
		}, {
			key: "seat",
			label: "Posto",
			value: "1C*",
			textAlignment: PKTextAlignment.Center,
		}
	],
	secondaryFields: [
		{
			key: "Imbarco",
			label: "Imbarco chiuso",
			value: "18:40",
			textAlignment: PKTextAlignment.Center,
		},
		{
			key: "takeoff",
			label: "Partenza",
			value: "19:10",
			textAlignment: PKTextAlignment.Center,
		},
		{
			key: "SpeedyBoarding",
			label: "SB",
			value: "Si",
			textAlignment: PKTextAlignment.Center,
		},
		{
			key: "boarding",
			label: "Imbarco",
			value: "Anteriore",
			textAlignment: PKTextAlignment.Center,
		}
	]
	*/
	  }
	: null;

export const initialState: State = {
	pass: {
		...__DEV_DEFAULT_PASS_PROPS,
	},
	media: {},
	translations: {},
	projectOptions: {
		activeMediaLanguage: "default",
	},
};

export interface State {
	pass: Partial<PassMixedProps>;
	media: LocalizedMediaGroup;
	translations: LocalizedTranslationsGroup;
	projectOptions: ProjectOptions;
}

export interface ProjectOptions {
	title?: string;
	activeMediaLanguage: string;
	id?: string;
	savedAtTimestamp?: number;
}

export interface LocalizedTranslationsGroup {
	[languageOrDefault: string]: TranslationsSet;
}

export interface TranslationsSet {
	enabled: boolean;
	translations: {
		[translationCoupleID: string]: [placeholder?: string, value?: string];
	};
}

export interface LocalizedMediaGroup {
	[languageOrDefault: string]: MediaSet;
}

export type MediaSet = {
	[K in keyof MediaProps]: CollectionSet;
};

export interface CollectionSet {
	activeCollectionID: string;
	enabled: boolean;
	collections: {
		[collectionID: string]: MediaCollection;
	};
}

export interface MediaCollection {
	name: string;
	resolutions: IdentifiedResolutions;
}

export interface IdentifiedResolutions {
	[resolutionID: string]: {
		name: string;
		content: ArrayBuffer;
	};
}
