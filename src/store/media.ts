import { Action } from "redux";
import { MediaProps } from "../Pass";
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
	| Actions.Edit
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
		};

		case INIT: {
			const newState = { ...state };

			newState[action.mediaLanguage][action.mediaName] = {
				activeCollectionID: "",
				collections: {},
				enabled: true,
			};

			return newState;
		};

		case PURGE: {
			const newState = { ...state };
			delete newState[action.mediaLanguage][action.mediaLanguage];
			return newState;
		};

		case DESTROY: {
			const newState = { ...state };
			delete newState[action.mediaLanguage];

			return newState;
		};

		case EDIT: {
			const newState = { ...state };

			const selectedLanguage = newState[action.mediaLanguage];
			const selectedMediaCollections = selectedLanguage[action.mediaName];

			selectedMediaCollections.activeCollectionID = action.activeCollectionID;

			/**
			 * Updating store collections
			 * and deleting the deleted ones.
			 */

			for (const [collID, collection] of Object.entries(action.collections)) {
				if (!collection) {
					delete selectedMediaCollections.collections[collID];
				} else {
					selectedMediaCollections.collections[collID] = collection;
				}
			}

			return newState;
		};

		case SET_ACTIVE_COLLECTION: {
			const newState = { ...state };

			const selectedLanguage = newState[action.mediaLanguage];
			const selectedMediaCollections = selectedLanguage[action.mediaName];
			selectedMediaCollections.activeCollectionID = action.collectionID;

			return newState
		};

		case SET_EXPORT_STATE: {
			const newState = { ...state };
			const selectedMedia = newState[action.mediaLanguage][action.mediaName];
			selectedMedia.enabled = action.enabled;

			return newState;
		};

		default: {
			return state;
		};
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

export function Init(mediaName: keyof MediaProps, mediaLanguage: string): Actions.Init {
	return {
		type: INIT,
		mediaName,
		mediaLanguage,
	};
}

export function Purge(mediaLanguage: string, mediaName: keyof MediaProps): Actions.Purge {
	return {
		type: PURGE,
		mediaName,
		mediaLanguage
	};
}

export function Destroy(mediaLanguage: string): Actions.Destroy {
	return {
		type: DESTROY,
		mediaLanguage,
	};
}

export function EditCollection(mediaName: keyof MediaProps, collectionID: string, collection: MediaCollection | null): Actions.EditCollection {
	return {
		type: EDIT_COLLECTION,
		mediaName,
		collectionID,
		collection,
	};
}

/** Middleware-only action */
export function Edit(mediaLanguage: string, mediaName: keyof MediaProps, collections: CollectionSet["collections"]): Actions.Edit {
	return {
		type: EDIT,
		collections,
		mediaLanguage,
		mediaName
	};
}

export function SetExportState(mediaName: keyof MediaProps, mediaLanguage: string, enabled: boolean): Actions.SetExportState {
	return {
		type: SET_EXPORT_STATE,
		mediaLanguage,
		mediaName,
		enabled,
	};
}

export function SetActiveCollection(mediaName: keyof MediaProps, mediaLanguage: string, collectionID: string): Actions.SetActiveCollection {
	return {
		type: SET_ACTIVE_COLLECTION,
		mediaLanguage,
		mediaName,
		collectionID
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	interface EditCollection extends Action<typeof EDIT_COLLECTION> {
		mediaName: keyof MediaProps;
		collectionID: string;
		collection: MediaCollection;
	}

	/** This action is called by the middleware */
	interface Edit extends Action<typeof EDIT> {
		mediaLanguage: string;
		mediaName: keyof MediaProps;
		collections: CollectionSet["collections"];

		/** To be used only from active collection middleware */
		activeCollectionID?: string;
	}

	interface Create extends Action<typeof CREATE> {
		mediaLanguage: string;
	}

	interface Init extends Action<typeof INIT> {
		mediaName: keyof MediaProps;
		mediaLanguage: string;
	}

	interface Purge extends Action<typeof PURGE> {
		mediaName: keyof MediaProps;
		mediaLanguage: string;
	}

	interface Destroy extends Action<typeof DESTROY> {
		mediaLanguage: string;
	}

	interface SetExportState extends Action<typeof SET_EXPORT_STATE> {
		mediaLanguage: string;
		mediaName: keyof MediaProps;
		enabled: boolean;
	}

	interface SetActiveCollection extends Action<typeof SET_ACTIVE_COLLECTION> {
		mediaName: keyof MediaProps;
		mediaLanguage: string;
		collectionID: string;
	}
}
