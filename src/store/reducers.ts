import { combineReducers } from "redux";
import { State, initialState, CollectionSet } from "./state";
import { SinglePropSettingAction, ConfigActions, PassProps, ProjectOptions, POKeys, POValues, MediaEditAction } from "./actions";

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

export function media(state = initialState.media, action: MediaEditAction): State["media"] {
	switch (action.type) {
		case ConfigActions.EDIT_MEDIA: {
			const newState = { ...state };

			const selectedLanguage = (newState[action.mediaLanguage] || (newState[action.mediaLanguage] = {}));
			const selectedMediaCollections = (selectedLanguage[action.mediaName] || (selectedLanguage[action.mediaName] = { activeCollectionID: null }));

			const parsedCollections = Object.keys(action.collections).reduce<CollectionSet>((acc, coll) => {
				if (action.collections[coll] === undefined && coll !== "activeCollectionID") {
					return acc;
				}

				return {
					...acc,
					[coll]: action.collections[coll]
				};
			}, {} as CollectionSet);

			Object.assign(selectedMediaCollections, parsedCollections);
			return newState;
		};

		default: {
			return state;
		}
	}
}

export function projectOptions(state = initialState.projectOptions, action: SinglePropSettingAction<POKeys, POValues>): ProjectOptions {
	if (!action.value) {
		const stateCopy = { ...state };

		delete stateCopy[action.key];
		return stateCopy;
	}

	return {
		...state,
		[action.key]: action.value
	};
}

/* function isMedia(value: any) {
	return (
		value instanceof Array &&
		typeof value[0] === "string" &&
		value[1] instanceof ArrayBuffer
	);
}
 */

export default combineReducers<State>({
	pass,
	media,
	projectOptions,
});
