import { PassMixedProps, PassMediaProps, PassKind } from "@pkvd/PKPass";
import { Pass } from "@pkvd/passkit-types";

/** Webpack defined */
declare const __DEV__: boolean;

const __DEV_DEFAULT_PASS_PROPS = __DEV__
	? {
			transitType: Pass.PKTransitType.Boat,
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
			textAlignment: Pass.PKTextAlignment.Center,
		},
		{
			key: "date",
			label: "Data",
			value: "21 set",
			textAlignment: Pass.PKTextAlignment.Center,
		}
	],
	primaryFields: [
		{
			key: "from",
			label: "Venezia Marco Polo",
			value: "VCE",
			textAlignment: Pass.PKTextAlignment.Left,
		},
		{
			key: "to",
			label: "Napoli",
			value: "NAP",
			textAlignment: Pass.PKTextAlignment.Right,
		},
	],
	auxiliaryFields: [
		{
			key: "user",
			label: "Passeggero",
			value: "SIG. ALEXANDER PATRICK CERUTTI",
			textAlignment: Pass.PKTextAlignment.Left,
		}, {
			key: "seat",
			label: "Posto",
			value: "1C*",
			textAlignment: Pass.PKTextAlignment.Center,
		}
	],
	secondaryFields: [
		{
			key: "Imbarco",
			label: "Imbarco chiuso",
			value: "18:40",
			textAlignment: Pass.PKTextAlignment.Center,
		},
		{
			key: "takeoff",
			label: "Partenza",
			value: "19:10",
			textAlignment: Pass.PKTextAlignment.Center,
		},
		{
			key: "SpeedyBoarding",
			label: "SB",
			value: "Si",
			textAlignment: Pass.PKTextAlignment.Center,
		},
		{
			key: "boarding",
			label: "Imbarco",
			value: "Anteriore",
			textAlignment: Pass.PKTextAlignment.Center,
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
	[K in keyof PassMediaProps]: CollectionSet;
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
