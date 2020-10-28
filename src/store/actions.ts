import { PassKind } from "../model";
import { Action } from "redux";
import { MediaProps, PassMixedProps } from "../Pass";
import { ThunkAction } from "redux-thunk";
import { IdentifiedCollections, IdentifiedResolutions, MediaCollection, State } from "./state";

export type PassProps = keyof PassMixedProps;
export type ProjectOptions = State["projectOptions"];
export type POKeys = keyof ProjectOptions;
export type POValues = ProjectOptions[POKeys];

export const CollectionEditActionName = 0b0001;
export const CollectionEditActionResolutions = 0b0010;
export const CollectionEditActionAll = 0b0011;

export interface MediaCollectionAction extends Action<ConfigActions.EDIT_COLLECTION> {
	mediaName: keyof MediaProps,
	collectionID: string;
	collection: MediaCollection,
	editHints: number,
}

export function editCollection(mediaName: keyof MediaProps, collectionID: string, collection: MediaCollection | null, editHints: number): MediaCollectionAction {
	return {
		type: ConfigActions.EDIT_COLLECTION,
		mediaName,
		collectionID,
		collection,
		editHints
	};
}

export interface MediaEditAction extends Action<ConfigActions.EDIT_MEDIA> {
	mediaLanguage: string;
	mediaName: keyof MediaProps;
	collection: MediaCollection;
}

export interface SinglePropSettingAction<K extends string, V = any> extends Action<ConfigActions> {
	key: K;
	value: V;
}

export enum ConfigActions {
	SET_PROJECT_OPT = "SET_PROJECT_OPTION",
	SET_SINGLE_PROP = "CHANGE_SINGLE_PROP",
	SET_PASS_KIND = "SET_PASS_KIND",
	SET_PROPS = "SET_PROPS",

	/**
	 * Media collection actions types
	 */

	EDIT_COLLECTION = "EDIT_COLLECTIONS",

	/** This is an action that is returned from URLMiddleware after processing */
	EDIT_MEDIA = "EDIT_MEDIA"
}

// Action Creators

export function setProjectOption(key: POKeys, value: POValues): SinglePropSettingAction<POKeys, POValues> {
	return {
		type: ConfigActions.SET_PROJECT_OPT,
		key,
		value,
	};
}

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
