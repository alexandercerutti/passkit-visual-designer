import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { PassMediaProps } from "@pkvd/pkpass";
import type { State } from "..";
import * as Store from "..";
import { CollectionSet, MediaCollection } from "../store";

export default function PurgeMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: Store.Options.Actions.Set) => {
		if (action.type !== Store.Options.SET_OPTION || action.key !== "activeMediaLanguage") {
			return next(action);
		}

		const {
			media: prepurgeMedia,
			projectOptions: { activeMediaLanguage },
			translations,
		} = store.getState();

		if (action.type === Store.Options.SET_OPTION) {
			const mediaGenerator = purgeGenerator(store, Store.Media.Purge);
			const translationsGenerator = purgeGenerator(store, Store.Translations.Destroy);

			/** Generators startup */
			mediaGenerator.next();
			translationsGenerator.next();

			/**
			 * If language changed, we have to discover if
			 * current language has medias and translations that can be purged.
			 *
			 * Language might not have been initialized. In that case we cannot
			 * purge anything nor destroy.
			 */

			if (prepurgeMedia[activeMediaLanguage]) {
				for (const [mediaName, collectionSet] of Object.entries(
					prepurgeMedia[activeMediaLanguage]
				) as [keyof PassMediaProps, CollectionSet][]) {
					enqueueMediaPurgeOnEmpty(mediaGenerator, collectionSet, activeMediaLanguage, mediaName);
				}

				const nextState = mediaGenerator.next().value;

				if (!Object.keys(nextState.media[activeMediaLanguage]).length) {
					store.dispatch(Store.Media.Destroy(activeMediaLanguage));
				}
			} else {
				// finishing anyway to not leave it suspended... poor generator.
				mediaGenerator.next();
			}

			for (const [language, translationSet] of Object.entries(translations)) {
				if (!Object.keys(translationSet.translations).length) {
					translationsGenerator.next([language]);
				}
			}

			// Completing. No need to get next state
			translationsGenerator.next();
		}

		return next(action);
	};
}

function areAllCollectionsEmpty(collectionsEntry: [string, MediaCollection][]) {
	return collectionsEntry.every(([_, collection]) => Object.keys(collection.resolutions).length);
}

function enqueueMediaPurgeOnEmpty(
	generator: ReturnType<typeof purgeGenerator>,
	collectionSet: Store.CollectionSet,
	language: string,
	mediaName: keyof PassMediaProps
): void {
	const collectionEntries = Object.entries(collectionSet.collections);

	if (!collectionEntries.length || areAllCollectionsEmpty(collectionEntries)) {
		generator.next([language, mediaName]);
	}
}

type GeneratorElement = [setID: string, mediaID?: keyof PassMediaProps];

function* purgeGenerator(
	store: MiddlewareAPI<Dispatch, State>,
	actionFactory: (...args: any[]) => AnyAction
): Generator<State, State, GeneratorElement> {
	const purgeIdentifiers: GeneratorElement[] = [];
	let value: typeof purgeIdentifiers[0];

	while ((value = yield) !== undefined) {
		purgeIdentifiers.push(value);
	}

	for (let i = purgeIdentifiers.length, set: typeof value; (set = purgeIdentifiers[--i]); ) {
		store.dispatch(actionFactory(...set));
	}

	return store.getState();
}
