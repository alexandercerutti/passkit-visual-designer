import { combineReducers } from "redux";
import { State, initialState, CollectionSet } from "./state";
import { SinglePropSettingAction, ConfigActions, PassProps, ProjectOptions, POKeys, POValues, MediaEditAction, ActiveCollectionSetAction, MediaExportStateAction } from "./actions";

/**
 * Reducer for actions in PassSelector
 *
 * @param state
 * @param action
 */

function pass(state = initialState.pass, action: SinglePropSettingAction<PassProps>): State["pass"] {
	switch (action.type) {
		case ConfigActions.SET_SINGLE_PROP: {
			if (!action.value && state[action.key]) {
				const stateCopy = { ...state };
				delete stateCopy[action.key];

				return stateCopy;
			}

			return {
				...state,
				[action.key]: action.value
			};
		}

		default: {
			return state;
		}
	}
}

export function media(state = initialState.media, action: MediaEditAction | ActiveCollectionSetAction | MediaExportStateAction): State["media"] {
	switch (action.type) {
		case ConfigActions.EDIT_MEDIA: {
			const newState = { ...state };

			const selectedLanguage = (
				newState[action.mediaLanguage] ||
				(newState[action.mediaLanguage] = {})
			);

			const selectedMediaCollections = (
				selectedLanguage[action.mediaName] ||
				(selectedLanguage[action.mediaName] = {
					enabled: true,
					activeCollectionID: "",
					collections: {}
				})
			);

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

		case ConfigActions.SET_MEDIA_USAGE: {
			const newState = { ...state };

			const selectedLanguage = (
				newState[action.mediaLanguage] ||
				(newState[action.mediaLanguage] = {})
			);

			const selectedMediaCollections = selectedLanguage[action.mediaName];
			selectedMediaCollections.activeCollectionID = action.collectionID;

			return newState
		}

		case ConfigActions.SET_MEDIA_EXPORT_STATE: {
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

export function projectOptions(state = initialState.projectOptions, action: SinglePropSettingAction<POKeys, POValues>): ProjectOptions {
	switch (action.type) {
		case ConfigActions.SET_PROJECT_OPT: {
			if (!action.value) {
				const stateCopy = { ...state };

				delete stateCopy[action.key];
				return stateCopy;
			}

			return {
				...state,
				[action.key]: action.value
			};
		};

		default: {
			return state;
		}
	}
}

export default combineReducers<State>({
	pass,
	media,
	projectOptions,
});
