import { PassKind } from "../../model";
import { Action } from "redux";
import { PassMixedProps } from "../../Pass";
import { WalletPassFormat } from "../../Pass/constants";

export interface SelectionAction extends Action<PSActionTypes> {
	kind?: PassKind;
	props?: Partial<WalletPassFormat>;
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

export function setPassProps(props: PassMixedProps): SelectionAction {
	return {
		type: PSActionTypes.SET_PROPS,
		props
	};
}
