import { Action } from "redux";
import { MediaProps } from "../Pass";
import { CollectionSet, initialState, MediaCollection, State } from ".";

// ************************************************************************ //

// ********************* //
// *** ACTION TYPES *** //
// ********************* //

// ************************************************************************ //

export const ADD = "ADD_TRANSLATION";
export const REMOVE = "REMOVE_TRANSLATION";
export const EDIT = "EDIT";
export const SET_EXPORT_STATE = "SET_EXPORT_STATE";

// ************************************************************************ //

// ********************* //
// *** MEDIA REDUCER *** //
// ********************* //

// ************************************************************************ //

type TranslationsActions =
	| Actions.Edit
	| Actions.SetExportState
	| Actions.Add
	| Actions.Remove;

export default function reducer(state = initialState.translations, action: TranslationsActions): State["translations"] {
	switch (action.type) {
		case ADD: {
			const newState = { ...state };
			newState
			/* 			newState[action.mediaLanguage] = {};
			 */
			return newState;
		};


		case REMOVE: {
			const newState = { ...state };
			/* 			delete newState[action.mediaLanguage];*/

			return newState;
		};

		case EDIT: {
			const newState = { ...state };

			/*	const selectedLanguage = newState[action.mediaLanguage];
				const selectedMediaCollections = selectedLanguage[action.mediaName];

				selectedMediaCollections.activeCollectionID = action.activeCollectionID;

				/**
				 * Updating store collections
				 * and deleting the deleted ones.
				 */

			/*	for (const [collID, collection] of Object.entries(action.collections)) {
					if (!collection) {
						delete selectedMediaCollections.collections[collID];
					} else {
						selectedMediaCollections.collections[collID] = collection;
					}
				} */

			return newState;
		};

		case SET_EXPORT_STATE: {
			/* 			const newState = { ...state };
						const selectedMedia = newState[action.mediaLanguage][action.mediaName];
						selectedMedia.enabled = action.enabled;

						return newState; */
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

export function Add(translationLanguage: string): Actions.Add {
	return {
		type: ADD,
		translationLanguage,
	};
}

export function Remove(translationLanguage: string, translationID: string): Actions.Remove {
	return {
		type: REMOVE,
		translationLanguage,
		translationID
	};
}

/** Middleware-only action */
export function Edit(translationLanguage: string, translationID: string, placeholderContent: string, valueContent: string): Actions.Edit {
	return {
		type: EDIT,
		translationLanguage,
		translationID,
		placeholderContent,
		valueContent,
	};
}

export function SetExportState(translationLanguage: string, enabled: boolean): Actions.SetExportState {
	return {
		type: SET_EXPORT_STATE,
		translationLanguage,
		enabled,
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	/** This action is called by the middleware */
	interface Edit extends Action<typeof EDIT> {
		translationLanguage: string;
		translationID: string;
		placeholderContent: string;
		valueContent: string;
	}

	interface Add extends Action<typeof ADD> {
		translationLanguage: string;
	}

	interface Remove extends Action<typeof REMOVE> {
		translationLanguage: string;
		translationID: string;
	}

	interface SetExportState extends Action<typeof SET_EXPORT_STATE> {
		translationLanguage: string;
		enabled: boolean;
	}
}
