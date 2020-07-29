import { PassKind } from "../model";
import { Action } from "redux";
import { PassMixedProps } from "../Pass";
import { WalletPassFormat } from "../Pass/constants";

export interface SelectionAction extends Action<ActionTypes> {
	kind?: PassKind;
	props?: Partial<WalletPassFormat>;
}

export interface SinglePropSettingAction extends Action<ConfigActions> {
	key: keyof PassMixedProps;
	value: number | string;
}

export enum ConfigActions {
	CHANGE_VALUE = "changeValue"
}

export enum ActionTypes {
	SET_PASS_KIND = "setPassKind",
	SET_PROPS = "setProps",
}

// Action Creators

export function setPassKind(kind: PassKind): SelectionAction {
	return {
		type: ActionTypes.SET_PASS_KIND,
		kind,
	};
}

export function setPassProps(props: PassMixedProps): SelectionAction {
	return {
		type: ActionTypes.SET_PROPS,
		props
	};
}

export function changePassPropValue(key: SinglePropSettingAction["key"], value: SinglePropSettingAction["value"]): SinglePropSettingAction {
	return {
		type: ConfigActions.CHANGE_VALUE,
		key,
		value
	};
}
