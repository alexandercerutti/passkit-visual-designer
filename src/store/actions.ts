import { PassKind } from "../model";
import { Action } from "redux";
import { MediaProps, PassMixedProps } from "../Pass";
import { ThunkAction } from "redux-thunk";
import { CollectionSet, MediaCollection, State } from "./state";

export type PassProps = keyof PassMixedProps;
export type ProjectOptions = State["projectOptions"];
export type POKeys = keyof ProjectOptions;
export type POValues = ProjectOptions[POKeys];

export interface MediaCollectionAction extends Action<ConfigActions.EDIT_COLLECTION> {
	mediaName: keyof MediaProps,
	collectionID: string;
	collection: MediaCollection,
}

export function editCollection(mediaName: keyof MediaProps, collectionID: string, collection: MediaCollection | null): MediaCollectionAction {
	return {
		type: ConfigActions.EDIT_COLLECTION,
		mediaName,
		collectionID,
		collection,
	};
}

/**
 * This is the action called by the middleware
 */

export interface MediaEditAction extends Action<ConfigActions.EDIT_MEDIA> {
	mediaLanguage: string;
	mediaName: keyof MediaProps;
	collections: CollectionSet["collections"];

	/** To be used only from active collection middleware */
	activeCollectionID?: string;
}

export interface ActiveCollectionSetAction extends Action<ConfigActions.SET_MEDIA_USAGE> {
	mediaName: keyof MediaProps;
	mediaLanguage: string;
	collectionID: string;
}

export function setMediaActiveCollection(mediaName: keyof MediaProps, mediaLanguage: string, collectionID: string): ActiveCollectionSetAction {
	return {
		type: ConfigActions.SET_MEDIA_USAGE,
		mediaLanguage,
		mediaName,
		collectionID
	};
}

export interface MediaExportStateAction extends Action<ConfigActions.SET_MEDIA_EXPORT_STATE> {
	mediaLanguage: string;
	mediaName: keyof MediaProps;
	enabled: boolean;
}

export function setMediaExportState(mediaName: keyof MediaProps, mediaLanguage: string, enabled: boolean): MediaExportStateAction {
	return {
		type: ConfigActions.SET_MEDIA_EXPORT_STATE,
		mediaLanguage,
		mediaName,
		enabled
	};
}

export interface MediaSetCreateAction extends Action<ConfigActions.CREATE_MEDIA_SET> {
	mediaLanguage: string;
}

export function createMediaSet(mediaLanguage: string): MediaSetCreateAction {
	return {
		type: ConfigActions.CREATE_MEDIA_SET,
		mediaLanguage,
	};
}

export interface MediaInitAction extends Action<ConfigActions.INIT_MEDIA> {
	mediaName: keyof MediaProps;
	mediaLanguage: string;
}

export function initMedia(mediaName: keyof MediaProps, mediaLanguage: string): MediaInitAction {
	return {
		type: ConfigActions.INIT_MEDIA,
		mediaName,
		mediaLanguage
	};
}

export interface MediaSetDestroyAction extends Action<ConfigActions.DESTROY_MEDIA_SET> {
	mediaLanguage: string;
}

export function destroyMediaSet(mediaLanguage: string): MediaSetDestroyAction {
	return {
		type: ConfigActions.DESTROY_MEDIA_SET,
		mediaLanguage,
	};
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

	SET_MEDIA_EXPORT_STATE = "SET_MEDIA_EXPORT_STATE",

	CREATE_MEDIA_SET = "CREATE_MEDIA_SET",
	INIT_MEDIA = "INIT_MEDIA",
	DESTROY_MEDIA_SET = "DESTROY_SEDIA_SET",

	/**
	 * Media collection actions types
	 */

	EDIT_COLLECTION = "EDIT_COLLECTIONS",
	SET_MEDIA_USAGE = "SET_MEDIA_USAGE",

	/** This is an action that is returned from URLMiddleware after processing */
	EDIT_MEDIA = "EDIT_MEDIA"
}

// Action Creators

export interface ProjectOptionSetAction extends Action<ConfigActions.SET_PROJECT_OPT> {
	key: POKeys;
	value: POValues;
}

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
