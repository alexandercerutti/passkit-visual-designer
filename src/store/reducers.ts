import { combineReducers } from "redux";
import { State, initialState } from "./state";
import { SinglePropSettingAction, ConfigActions } from "./actions";

/**
 * Reducer for actions in PassSelector
 *
 * @param state
 * @param action
 */

function pass(state = initialState.pass, action: SinglePropSettingAction): State["pass"] {
	switch (action.type) {
		case ConfigActions.SET_SINGLE_PROP: {
			// Array buffers that come from URLMiddleware as blobs must not be
			// stored here but in media
			if (typeof action.value === "string" && action.value.includes("blob:")) {
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

export function media(state = initialState.media, action: SinglePropSettingAction): State["media"] {
	switch (action.type) {
		case ConfigActions.SET_SINGLE_PROP: {
			if (typeof action.value !== "string" || !action.value.includes("blob:")) {
				return state;
			}

			return {
				...state,
				[action.key]: action.value
			}
		}

		default: {
			return state;
		}
	}
}


export default combineReducers<State>({
	pass,
	media
});
