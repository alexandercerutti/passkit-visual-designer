import { PassKind } from "../../model";
import { Action } from "redux";
import { PassProps } from "../../passes/PassCore";

export interface SelectionAction extends Action<PSActionTypes> {
	kind?: PassKind;
	props?: PassProps;
}

export enum PSActionTypes {
	SET_PASS_KIND = "setPassKind",
	SET_PROPS = "setProps"
}

// Action Creators

export function setPassKind(kind: PassKind): SelectionAction {
	return {
		type: PSActionTypes.SET_PASS_KIND,
		kind,
	};
}

export function setPassProps(props: PassProps): SelectionAction {
	return {
		type: PSActionTypes.SET_PROPS,
		props
	};
}
