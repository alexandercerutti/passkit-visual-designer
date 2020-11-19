import { AnyAction, Dispatch, MiddlewareAPI } from "redux";
import { ConfigActions, MediaEditAction } from "../actions";
import { CollectionSet, MediaCollection, State } from "../state";

/**
 * This middleware handles the cases in which, for a media being edited,
 * if no collection becomes available, it removes the active collection
 * or if only one collection becomes active, it automatically set it
 * as the active.
 *
 * @param store
 */

export default function CollectionActivationMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: MediaEditAction) => {
		if (action.type !== ConfigActions.EDIT_MEDIA) {
			return next(action);
		}

		const nextActionCollectionsID = Object.entries(action.collections)
			.filter(([key, value]) => key !== "activeCollectionID" && value)
			.map(([key]) => key);

		if (nextActionCollectionsID.length === 1) {
			/**
			 * Only one element avaialble in the
			 * collections. Setting it as active.
			 */

			let nextCollectionID: string;

			if (!Object.keys(action.collections[nextActionCollectionsID[0]].resolutions).length) {
				nextCollectionID = "";
			} else {
				nextCollectionID = nextActionCollectionsID[0];
			}

			return next(createActionWithActiveID(action, nextCollectionID));
		}

		if (!nextActionCollectionsID.length) {
			/**
			 * No collection left. Removing
			 * activeCollectionID
			 */

			return next(createActionWithActiveID(action, ""));
		}

		const currentState = store.getState();
		const currentMedia = currentState.media[action.mediaLanguage][action.mediaName];
		const { activeCollectionID: currentActiveID } = currentMedia;

		if (!currentActiveID) {
			/** There is no collection active yet. Can I select one? */

			for (let i = nextActionCollectionsID.length, collection: MediaCollection; collection = action.collections[nextActionCollectionsID[--i]];) {
				if (Object.keys(collection.resolutions).length) {
					return next(createActionWithActiveID(action, nextActionCollectionsID[i]));
				}
			}

			/** There is no collection with at least one element */
			return next(action);
		}

		const action_activeCollResolutionAmount = Object.keys(action.collections[currentActiveID].resolutions).length;
		const store_activeCollResolutionAmount = Object.keys(currentMedia[currentActiveID].resolutions).length;

		const shouldSelectNextCollection = (
			action_activeCollResolutionAmount !== store_activeCollResolutionAmount &&
			action_activeCollResolutionAmount === 0
		);

		if (shouldSelectNextCollection) {
			/**
			 * Current collection changed and
			 * we are going to have no media
			 * in this collection. Selecting next
			 */

			const collectionsCopy = { ...action.collections };
			delete collectionsCopy.activeCollectionID;
			const nextCollectionID = findNextSuitableCollectionID(collectionsCopy);

			return next(createActionWithActiveID(action, nextCollectionID));
		}

		return next(action);
	}
}

function findNextSuitableCollectionID(collections: Omit<CollectionSet, "activeCollectionID">): string {
	for (let [collID, collection] of Object.entries(collections)) {
		if (collection.resolutions.length) {
			return collID;
		}
	}

	return "";
}

function createActionWithActiveID(action: MediaEditAction, activeCollectionID: string) {
	return {
		...action,
		collections: {
			...action.collections,
			activeCollectionID,
		}
	}
}
