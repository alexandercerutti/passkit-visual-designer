import { combineReducers } from "redux";
import { State, initialState } from "./state";
import { SinglePropSettingAction, ConfigActions, PassProps, ProjectOptions, POKeys, POValues } from "./actions";

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

			// Array buffers that come from URLMiddleware as blobs must not be
			// stored here but in media
			if (isMedia(action.value)) {
				return state;
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

export function media(state = initialState.media, action: SinglePropSettingAction<PassProps>): State["media"] {
	switch (action.type) {
		case ConfigActions.SET_SINGLE_PROP: {
			if (!action.value && state[action.key]) {
				const stateCopy = { ...state };
				delete stateCopy[action.key];

				return stateCopy;
			}

			if (!isMedia(action.value)) {
				return state;
			}

			return {
				...state,
				[action.key]: action.value[0]
			}
		}

		default: {
			return state;
		}
	}
}

export function rawMedia(state = initialState.rawMedia, action: SinglePropSettingAction<PassProps, [string, ArrayBuffer]>): State["rawMedia"] {
	switch (action.type) {
		case ConfigActions.SET_SINGLE_PROP: {
			if (!action.value && state[action.key]) {
				const stateCopy = { ...state };
				delete stateCopy[action.key];

				return stateCopy;
			}

			if (!isMedia(action.value)) {
				return state;
			}

			return {
				...state,
				[action.key]: action.value[1]
			};
		}

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

function isMedia(value: any) {
	return (
		value instanceof Array &&
		typeof value[0] === "string" &&
		value[1] instanceof ArrayBuffer
	);
}


export default combineReducers<State>({
	pass,
	media,
	rawMedia,
	projectOptions,
});
