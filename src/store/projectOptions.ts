import { Action } from "redux";
import { initialState, State } from ".";

export type POKeys = keyof State["projectOptions"];
export type POValues = State["projectOptions"][POKeys];

// ************************************************************************ //

// ********************* //
// *** ACTION TYPES *** //
// ********************* //

// ************************************************************************ //

export const SET_OPTION = "SET_OPTION";

// ************************************************************************ //

// ********************* //
// *** MEDIA REDUCER *** //
// ********************* //

// ************************************************************************ //

export default function reducer(state = initialState.projectOptions, action: Actions.Set): State["projectOptions"] {
	switch (action.type) {
		case SET_OPTION: {
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

// ************************************************************************ //

// *********************** //
// *** ACTION CREATORS *** //
// *********************** //

// ************************************************************************ //

export function Set(key: POKeys, value: POValues): Actions.Set {
	return {
		type: SET_OPTION,
		key,
		value,
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	interface Set extends Action<typeof SET_OPTION> {
		key: POKeys;
		value: POValues;
	}
}
