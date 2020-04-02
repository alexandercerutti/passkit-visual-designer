import { PassKind } from "../../model";
import { Action } from "redux";

export interface SelectionAction extends Action<PSActionTypes> {
	pass?: PassKind;
}

export enum PSActionTypes {
	SELECT_KIND = "select",
	SELECT_ALTERNATIVE = "alternative"
}

// Action Creators

export function selectPassKind(pass: PassKind): SelectionAction {
	return {
		type: PSActionTypes.SELECT_KIND,
		pass
	};
}

export function selectPassAlternative(): SelectionAction {
	return {
		type: PSActionTypes.SELECT_ALTERNATIVE,
	};
}
