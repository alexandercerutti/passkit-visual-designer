import { combineReducers } from "redux";
import { State, initialState } from "./state";
import { SelectionAction, ActionTypes, SinglePropSettingAction, ConfigActions } from "./actions";

/**
 * Reducer for actions in PassSelector
 *
 * @param state
 * @param action
 */

function pass(state = initialState.pass, action: SelectionAction): State["pass"] {
	switch (action.type) {
		case ActionTypes.SET_PASS_KIND: {
			return {
				...state,
				kind: action.kind,
			};
		}
		case ActionTypes.SET_PROPS: {
			return {
				...state,
				...action.props
			};
		}

		default: {
			return state;
		}
	}
}

export function media(state = initialState.media, action: SinglePropSettingAction): State["media"] {
	switch (action.type) {
		case ConfigActions.CHANGE_VALUE: {
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
