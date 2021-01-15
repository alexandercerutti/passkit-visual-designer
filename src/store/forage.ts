import { Action } from "redux";
import { State } from ".";

export interface ForageStructure {
	projects: {
		[projectName: string]: {
			preview: ArrayBuffer;
			snapshot: State;
		};
	};
}

// ************************************************************************ //

// ********************* //
// *** ACTION TYPES *** //
// ********************* //

// ************************************************************************ //

export const INIT = "forage/INIT";
export const RESET = "forage/RESET";

// ************************************************************************ //

// ********************* //
// *** MEDIA REDUCER *** //
// ********************* //

// ************************************************************************ //

/* NONE */

// ************************************************************************ //

// *********************** //
// *** ACTION CREATORS *** //
// *********************** //

// ************************************************************************ //

export function Init(snapshot: State): Actions.Init {
	return {
		type: INIT,
		...snapshot,
	};
}

// ************************************************************************ //

// ************************** //
// *** ACTIONS INTERFACES *** //
// ************************** //

// ************************************************************************ //

export declare namespace Actions {
	interface Init extends Action<typeof INIT> {
		media: State["media"];
		pass: State["pass"];
		projectOptions: State["projectOptions"];
		translations: State["translations"];
	}
}
