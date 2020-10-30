import { PassMixedProps, MediaProps } from "../Pass";

export type LocalizedMediaGroup = {
	[languageOrDefault: string]: MediaSet;
};

export type MediaSet = {
	[K in keyof MediaProps]: CollectionSet;
}

export type CollectionSet = {
	[collectionID: string]: MediaCollection;
} & {
	activeCollectionID: string;
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

export interface State {
	pass: Partial<PassMixedProps>;
	media: LocalizedMediaGroup;
	rawMedia: Partial<Record<keyof MediaProps, ArrayBuffer>>;
	projectOptions: {
		title?: string,
		activeMediaLanguage: string;
	};
}

export const initialState: State = {
	pass: {},
	media: {},
	rawMedia: {},
	projectOptions: {
		activeMediaLanguage: "default"
	},
}
