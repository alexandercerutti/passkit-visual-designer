import { PassKind } from "../model";
import type { PassMixedProps, MediaProps } from "../Pass";
import { PKTextAlignment, PKTransitType } from "../Pass/constants";

/** Webpack defined */
declare const isDevelopment: boolean;

const __DEV_DEFAULT_PASS_PROPS = isDevelopment ? {
	transitType: PKTransitType.Boat,
	kind: PassKind.BOARDING_PASS,
} : null;

export const initialState: State = {
	pass: {
		...__DEV_DEFAULT_PASS_PROPS
	},
	media: {},
	translations: {},
	projectOptions: {
		activeMediaLanguage: "default"
	},
};

export interface State {
	pass: Partial<PassMixedProps>;
	media: LocalizedMediaGroup;
	translations: LocalizedTranslationsGroup;
	projectOptions: {
		title?: string,
		activeMediaLanguage: string;
		id?: string;
		savedAtTimestamp?: number;
	};
}

export type LocalizedTranslationsGroup = {
	[languageOrDefault: string]: TranslationsSet;
}

export type TranslationsSet = {
	enabled: boolean;
	translations: {
		[translationCoupleID: string]: [string?, string?];
	};
};

export type LocalizedMediaGroup = {
	[languageOrDefault: string]: MediaSet;
};

export type MediaSet = {
	[K in keyof MediaProps]: CollectionSet;
};

export type CollectionSet = {
	activeCollectionID: string;
	enabled: boolean;
	collections: {
		[collectionID: string]: MediaCollection;
	};
};

export interface MediaCollection {
	name: string;
	resolutions: IdentifiedResolutions;
};

export type IdentifiedResolutions = {
	[resolutionID: string]: {
		name: string;
		content: ArrayBuffer;
	}
};
