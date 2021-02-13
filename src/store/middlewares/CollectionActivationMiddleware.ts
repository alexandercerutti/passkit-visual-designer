import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import type { CollectionSet, MediaCollection, State } from "..";
import * as Store from "..";

/**
 * This middleware handles the cases in which, for a media being edited,
 * if no collection becomes available, it removes the active collection
 * or if only one collection becomes active, it automatically set it
 * as the active.
 *
 * @param store
 */

export default function CollectionActivationMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: Store.Media.Actions.EditCollection) => {
		if (action.type !== Store.Media.EDIT_COLLECTION) {
			return next(action);
		}

		const { media } = store.getState();
		const nextCollectionSet = Object.assign({}, media[action.mediaLanguage][action.mediaName], {
			collections: {
				...media[action.mediaLanguage][action.mediaName].collections,
				[action.collectionID]: action.collection
			}
		});

		if (!action.collection) {
			/**
			 * Deleting the record before it is actually deleted by reducer
			 * so the detection is trustable
			 */
			delete nextCollectionSet.collections[action.collectionID];
		}

		const collections = Object.assign({}, nextCollectionSet.collections);
		const collectionsRecords = Object.keys(collections);
		let nextActiveCollectionID: string = null;

		if (!collectionsRecords.length) {
			/** No collection available. Removing selected key */
			nextActiveCollectionID = "";
		} else if (collectionsRecords.length === 1) {
			/** Only one collection available. Check if it has resolutions */
			const collectionKey = collectionsRecords[0];
			nextActiveCollectionID = Object.keys(collections[collectionKey].resolutions).length ? collectionKey : "";
		} else {
			/** More than one collections available */

			const currentActiveID = nextCollectionSet.activeCollectionID;

			if (!currentActiveID) {
				/**
				 * No active. Can I select one? Iterating on all the
				 * collections and looking for the first that has resolutions;
				 */

				for (let i = collectionsRecords.length, collection: MediaCollection; collection = collections[collectionsRecords[--i]];) {
					if (Object.keys(collection.resolutions).length) {
						nextActiveCollectionID = collectionsRecords[i];
						break;
					}
				}

				nextActiveCollectionID = findNextSuitableCollectionID(collections);
			} else {
				/**
				 * We have one, but current collection changed and we want to
				 * check if it still eligible for user or automatic selection.
				 * Otherwise select the next one.
				 *
				 * Comparing the resolutions before changes and after changes.
				 */

				const actionResolutionsAmount = Object.keys(collections[currentActiveID].resolutions).length;
				const storeResolutionsAmount = Object.keys(media[action.mediaLanguage][action.mediaName].collections[currentActiveID].resolutions).length;

				const isCurrentEligible = (
					actionResolutionsAmount === storeResolutionsAmount
				);

				if (!isCurrentEligible) {
					nextActiveCollectionID = findNextSuitableCollectionID(collections);
				} else {
					nextActiveCollectionID = currentActiveID;
				}
			}
		}

		store.dispatch(Store.Media.SetActiveCollection(action.mediaName, action.mediaLanguage, nextActiveCollectionID));

		return next(action);
	}
}

function findNextSuitableCollectionID(collections: CollectionSet["collections"]): string {
	for (let [collID, collection] of Object.entries(collections)) {
		if (Object.keys(collection.resolutions).length) {
			return collID;
		}
	}

	return "";
}
