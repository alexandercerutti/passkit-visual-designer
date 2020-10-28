import { PassMixedProps, MediaProps } from "../Pass";

/**
 * string is optional because we generate the
 * url in redux middleware
 */
export type ResolutionTuple = [ArrayBuffer, string?];

export type IdentifiedCollections = {
	[collectionID: string]: MediaCollection;
};

export type IdentifiedResolutions = {
	[resolutionID: string]: {
		name: string;
		content: ResolutionTuple;
	}
};

export interface MediaCollection {
	name: string;
	resolutions: IdentifiedResolutions;
}

export interface State {
	pass: Partial<PassMixedProps>;
	media: {
		[languageOrDefault: string]: {
			[K in keyof MediaProps]: IdentifiedCollections;
		}
	};
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
