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
	projectOptions: ProjectOptions;
}

export interface ProjectOptions {
	title?: string,
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
};

export interface LocalizedMediaGroup {
	[languageOrDefault: string]: MediaSet;
};

export type MediaSet = {
	[K in keyof MediaProps]: CollectionSet;
};

export interface CollectionSet {
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

export interface IdentifiedResolutions {
	[resolutionID: string]: {
		name: string;
		content: ArrayBuffer;
	}
};
