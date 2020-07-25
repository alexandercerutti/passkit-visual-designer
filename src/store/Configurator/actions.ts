import { Action } from "redux";
import { PassMixedProps } from "../../Pass";

export interface ConfiguratorAction extends Action<ConfigActions> {
	key: keyof PassMixedProps;
	value: number | string;
}

export enum ConfigActions {
	CHANGE_VALUE = "changeValue"
}

export function changeValue(key: ConfiguratorAction["key"], value: ConfiguratorAction["value"]): ConfiguratorAction {
	return {
		type: ConfigActions.CHANGE_VALUE,
		key,
		value
	};
}
