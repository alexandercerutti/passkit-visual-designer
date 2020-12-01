import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { PassKind } from "../model";
import { PassMixedProps } from "../Pass";
import { initialState, State } from ".";

// ************************************************************************ //

// ********************* //
// *** ACTION TYPES *** //
// ********************* //

// ************************************************************************ //

export const SET_PROP = "SET_PROP";
export const SET_PASS_KIND = "SET_PASS_KIND";
export const SET_PROPS = "SET_PROPS_BATCH";

// ************************************************************************ //

// ********************* //
// *** MEDIA REDUCER *** //
// ********************* //

// ************************************************************************ //

export default function reducer(state = initialState.pass, action: Actions.SetProp): State["pass"] {
	switch (action.type) {
		case SET_PROP: {
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

// ************************************************************************ //

// *********************** //
// *** ACTION CREATORS *** //
// *********************** //

// ************************************************************************ //

export function setProp(key: Actions.SetProp["key"], value: Actions.SetProp["value"]): Actions.SetProp {
	return {
		type: SET_PROP,
		key,
		value
	};
}

export function setKind(kind: PassKind) {
	return setProp("kind", kind);
}

export function setPropsBatch(props: PassMixedProps): ThunkAction<any, any, any, Actions.SetProp> {
	return (dispatch) => {
		const keys = Object.keys(props) as (keyof PassMixedProps)[];
		for (let i = keys.length, key: keyof PassMixedProps; key = keys[--i];) {
			dispatch(setProp(
				key,
				props[key]
			));
		}
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	interface SetProp extends Action<typeof SET_PROP> {
		key: keyof PassMixedProps;
		value: PassMixedProps[keyof PassMixedProps];
	}
}
