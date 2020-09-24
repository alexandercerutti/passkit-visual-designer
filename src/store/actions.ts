import { PassKind } from "../model";
import { Action } from "redux";
import { PassMixedProps } from "../Pass";
import { ThunkAction } from "redux-thunk";

export type PassProps = keyof PassMixedProps;

export interface SinglePropSettingAction<K extends string, V = any> extends Action<ConfigActions> {
	key: K;
	value: V;
}

export enum ConfigActions {
	SET_SINGLE_PROP = "changeSingleProp",
	SET_PASS_KIND = "setPassKind",
	SET_PROPS = "setProps"
}

// Action Creators

export function setPassKind(kind: PassKind) {
	return changePassPropValue("kind", kind);
}

export function setPassProps(props: PassMixedProps): ThunkAction<any, any, any, SinglePropSettingAction<PassProps>> {
	return (dispatch) => {
		const keys = Object.keys(props) as (keyof PassMixedProps)[];
		for (let i = keys.length, key: keyof PassMixedProps; key = keys[--i];) {
			dispatch(changePassPropValue(
				key,
				props[key]
			));
		}
	};
}

export function changePassPropValue(key: SinglePropSettingAction<PassProps>["key"], value: SinglePropSettingAction<PassProps>["value"]): SinglePropSettingAction<PassProps> {
	return {
		type: ConfigActions.SET_SINGLE_PROP,
		key,
		value
	};
}
