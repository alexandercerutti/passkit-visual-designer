import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import type { State } from "..";
import * as Store from "..";
import { MediaProps } from "../../Pass";
import { CollectionSet, MediaCollection } from "../store";

type AllowedActions =
	| Store.Media.Actions.Edit
	| Store.Options.Actions.Set
	| Store.Translations.Actions.Remove
	;

export default function PurgeMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: AllowedActions) => {
		if (action.type !== Store.Media.EDIT && (action.type !== Store.Options.SET_OPTION || action.key !== "activeMediaLanguage") && action.type !== Store.Translations.REMOVE) {
			return next(action);
		}

		const { media: prepurgeMedia, projectOptions: { activeMediaLanguage }, translations } = store.getState();

		if (action.type === Store.Options.SET_OPTION) {
			const mediaGenerator = purgeGenerator(store, Store.Media.Purge);
			const translationsGenerator = purgeGenerator(store, Store.Translations.Destroy);

			/** Generators startup */
			mediaGenerator.next();
			translationsGenerator.next();

			/**
			 * If language changed, we have to discover if
			 * current language has medias and translations that can be purged
			 */

			for (const [mediaName, collectionSet] of Object.entries(prepurgeMedia[activeMediaLanguage]) as [keyof MediaProps, CollectionSet][]) {
				enqueueMediaPurgeOnEmpty(mediaGenerator, collectionSet, activeMediaLanguage, mediaName);
			}

			const nextState = mediaGenerator.next().value;

			if (!Object.keys(nextState.media[activeMediaLanguage]).length) {
				store.dispatch(Store.Media.Destroy(activeMediaLanguage));
			}

			for (const [language, translationSet] of Object.entries(translations)) {
				if (!Object.keys(translationSet.translations).length) {
					translationsGenerator.next([language]);
				}
			}

			// Completing. No need to get next state
			translationsGenerator.next();
		} else if (action.type === Store.Media.EDIT) {
			const mediaGenerator = purgeGenerator(store, Store.Media.Purge);
			mediaGenerator.next(); // startup

			enqueueMediaPurgeOnEmpty(
				mediaGenerator,
				prepurgeMedia[action.mediaLanguage][action.mediaName],
				action.mediaLanguage,
				action.mediaName
			);

			// Ending
			const nextState = mediaGenerator.next().value;

			if (!Object.keys(nextState.media[activeMediaLanguage]).length) {
				store.dispatch(Store.Media.Destroy(activeMediaLanguage));
			}
		} else if (action.type === Store.Translations.REMOVE) {
			if (!Object.keys(translations[action.translationLanguage].translations).length) {
				store.dispatch(Store.Translations.Destroy(action.translationLanguage));
			}
		}

		return next(action);
	};
}

function areAllCollectionsEmpty(collectionsEntry: [string, MediaCollection][]) {
	return collectionsEntry.every(([_, collection]) => Object.keys(collection.resolutions).length);
}

function enqueueMediaPurgeOnEmpty(generator: ReturnType<typeof purgeGenerator>, collectionSet: Store.CollectionSet, language: string, mediaName: keyof MediaProps): void {
	const collectionEntries = Object.entries(collectionSet.collections);

	if (!collectionEntries.length || areAllCollectionsEmpty(collectionEntries)) {
		generator.next([language, mediaName]);
	}
}

type GeneratorElement = [setID: string, mediaID?: keyof MediaProps];

function* purgeGenerator(store: MiddlewareAPI<Dispatch, State>, actionFactory: (...args: any[]) => AnyAction): Generator<State, State, GeneratorElement> {
	const purgeIdentifiers: GeneratorElement[] = [];
	let value: typeof purgeIdentifiers[0];

	while ((value = yield) !== undefined) {
		purgeIdentifiers.push(value);
	}

	for (let i = purgeIdentifiers.length, set: typeof value; set = purgeIdentifiers[--i];) {
		store.dispatch(actionFactory(...set));
	}

	return store.getState();
}
