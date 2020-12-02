import type { PassMixedProps, MediaProps } from "../Pass";

export const initialState: State = {
	pass: {},
	media: {
		// Initializing default language because, otherwise
		// we would need to fire a Store.Media.Create action
		default: {}
	},
	projectOptions: {
		activeMediaLanguage: "default"
	},
};

export interface State {
	pass: Partial<PassMixedProps>;
	media: LocalizedMediaGroup;
	projectOptions: {
		title?: string,
		activeMediaLanguage: string;
	};
}

export type LocalizedMediaGroup = {
	[languageOrDefault: string]: MediaSet;
};

export type MediaSet = {
	[K in keyof MediaProps]: CollectionSet;
}

export type CollectionSet = {
	activeCollectionID: string;
	enabled: boolean;
	collections: {
		[collectionID: string]: MediaCollection;
	};
}

export interface MediaCollection {
	name: string;
	resolutions: IdentifiedResolutions;
};

export type IdentifiedResolutions = {
	[resolutionID: string]: {
		name: string;
		content: ResolutionTuple;
	}
};

/**
 * string is optional because we generate the
 * url in redux middleware
 */
export type ResolutionTuple = [ArrayBuffer, string?];
