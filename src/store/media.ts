import { Action } from "redux";
import { PassMediaProps } from "@pkvd/PKPass";
import { CollectionSet, initialState, MediaCollection, State } from ".";

// ************************************************************************ //

// ********************* //
// *** ACTION TYPES *** //
// ********************* //

// ************************************************************************ //

export const CREATE = "media/CREATE_LANGUAGE";
export const INIT = "media/INIT_MEDIA";
export const PURGE = "media/PURGE";
export const DESTROY = "media/DESTROY_MEDIA";
export const EDIT = "media/EDIT_MEDIA";
export const EDIT_COLLECTION = "media/EDIT_COLLECTION";
export const SET_EXPORT_STATE = "media/SET_EXPORT_STATE";
export const SET_ACTIVE_COLLECTION = "media/SET_ACTIVE_COLLECTION";

// ************************************************************************ //

// ********************* //
// *** MEDIA REDUCER *** //
// ********************* //

// ************************************************************************ //

type MediaActions =
	| Actions.EditCollection
	| Actions.SetActiveCollection
	| Actions.SetExportState
	| Actions.Create
	| Actions.Purge
	| Actions.Destroy
	| Actions.Init;

export default function reducer(state = initialState.media, action: MediaActions): State["media"] {
	switch (action.type) {
		case CREATE: {
			const newState = { ...state };
			newState[action.mediaLanguage] = {};

			return newState;
		}

		case INIT: {
			const newState = { ...state };

			newState[action.mediaLanguage][action.mediaName] = {
				activeCollectionID: "",
				collections: {},
				enabled: true,
			};

			return newState;
		}

		case PURGE: {
			const newState = { ...state };
			delete newState[action.mediaLanguage][action.mediaLanguage];
			return newState;
		}

		case DESTROY: {
			const newState = { ...state };
			delete newState[action.mediaLanguage];

			return newState;
		}

		case EDIT_COLLECTION: {
			const newState = { ...state };

			const selectedLanguage = newState[action.mediaLanguage];
			const selectedMedia = selectedLanguage[action.mediaName];
			const collections = selectedMedia.collections;

			if (!action.collection) {
				delete collections[action.collectionID];
			} else {
				action.collection.resolutions = Object.entries(action.collection.resolutions || {}).reduce(
					(acc, [id, resolution]) => {
						// If null, it has been removed
						if (!resolution) {
							return acc;
						}

						return {
							...acc,
							[id]: resolution,
						};
					},
					{}
				);

				collections[action.collectionID] = action.collection;
			}

			return newState;
		}

		case SET_ACTIVE_COLLECTION: {
			const newState = { ...state };

			const selectedLanguage = newState[action.mediaLanguage];
			const selectedMediaCollections = selectedLanguage[action.mediaName];
			selectedMediaCollections.activeCollectionID = action.collectionID;

			return newState;
		}

		case SET_EXPORT_STATE: {
			const newState = { ...state };
			const selectedMedia = newState[action.mediaLanguage][action.mediaName];
			selectedMedia.enabled = action.enabled;

			return newState;
		}

		default: {
			return state;
		}
	}
}

// ************************************************************************ //

// *********************** //
// *** ACTION CREATORS *** //
// *********************** //

// ************************************************************************ //

export function Create(mediaLanguage: string): Actions.Create {
	return {
		type: CREATE,
		mediaLanguage,
	};
}

export function Init(mediaName: keyof PassMediaProps, mediaLanguage: string): Actions.Init {
	return {
		type: INIT,
		mediaName,
		mediaLanguage,
	};
}

export function Purge(mediaLanguage: string, mediaName: keyof PassMediaProps): Actions.Purge {
	return {
		type: PURGE,
		mediaName,
		mediaLanguage,
	};
}

export function Destroy(mediaLanguage: string): Actions.Destroy {
	return {
		type: DESTROY,
		mediaLanguage,
	};
}

export function EditCollection(
	mediaName: keyof PassMediaProps,
	mediaLanguage: string,
	collectionID: string,
	collection: MediaCollection | null
): Actions.EditCollection {
	return {
		type: EDIT_COLLECTION,
		mediaName,
		mediaLanguage,
		collectionID,
		collection,
	};
}

export function SetExportState(
	mediaName: keyof PassMediaProps,
	mediaLanguage: string,
	enabled: boolean
): Actions.SetExportState {
	return {
		type: SET_EXPORT_STATE,
		mediaLanguage,
		mediaName,
		enabled,
	};
}

export function SetActiveCollection(
	mediaName: keyof PassMediaProps,
	mediaLanguage: string,
	collectionID: string
): Actions.SetActiveCollection {
	return {
		type: SET_ACTIVE_COLLECTION,
		mediaLanguage,
		mediaName,
		collectionID,
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	interface EditCollection extends Action<typeof EDIT_COLLECTION> {
		mediaLanguage: string;
		mediaName: keyof PassMediaProps;
		collectionID: string;
		collection: MediaCollection;
	}

	interface Create extends Action<typeof CREATE> {
		mediaLanguage: string;
	}

	interface Init extends Action<typeof INIT> {
		mediaName: keyof PassMediaProps;
		mediaLanguage: string;
	}

	interface Purge extends Action<typeof PURGE> {
		mediaName: keyof PassMediaProps;
		mediaLanguage: string;
	}

	interface Destroy extends Action<typeof DESTROY> {
		mediaLanguage: string;
	}

	interface SetExportState extends Action<typeof SET_EXPORT_STATE> {
		mediaLanguage: string;
		mediaName: keyof PassMediaProps;
		enabled: boolean;
	}

	interface SetActiveCollection extends Action<typeof SET_ACTIVE_COLLECTION> {
		mediaName: keyof PassMediaProps;
		mediaLanguage: string;
		collectionID: string;
	}
}
