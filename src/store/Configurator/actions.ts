import { Action } from "redux";
import { PassProps } from "../../passes/PassCore";

export interface ConfiguratorAction extends Action<ConfigActions> {
	key: keyof PassProps;
	value: any;
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
