import { PassKind } from "../model";
import { Action } from "redux";
import { PassMixedProps } from "../Pass";
import { ThunkAction } from "redux-thunk";

export interface SinglePropSettingAction extends Action<ConfigActions> {
	key: keyof PassMixedProps;
	value: any;
}

export enum ConfigActions {
	SET_SINGLE_PROP = "changeSingleProp",
	SET_PASS_KIND = "setPassKind",
	SET_PROPS = "setProps"
}

// Action Creators

export function setPassKind(kind: PassKind): SinglePropSettingAction {
	return {
		type: ConfigActions.SET_PASS_KIND,
		key: kind,
		value: {}
	};
}

export function setPassProps(props: PassMixedProps): ThunkAction<any, any, any, SinglePropSettingAction> {
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

export function changePassPropValue(key: SinglePropSettingAction["key"], value: SinglePropSettingAction["value"]): SinglePropSettingAction {
	return {
		type: ConfigActions.SET_SINGLE_PROP,
		key,
		value
	};
}
