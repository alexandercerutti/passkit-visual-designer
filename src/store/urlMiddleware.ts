import { State } from "./state";
import { Dispatch, AnyAction, MiddlewareAPI } from "redux";
import { SinglePropSettingAction, ConfigActions } from "./actions";

const URLPassProps = ["logo", "backgroundImage", "stripImage", "thumbnailImage", "appIcon"];

export default function URLMiddleware(store: MiddlewareAPI<Dispatch, State>) {
	return (next: Dispatch<AnyAction>) => (action: SinglePropSettingAction) => {
		if (action.type !== ConfigActions.CHANGE_VALUE) {
			return next(action);
		}

		if (!action.key || !URLPassProps.includes(action.key)) {
			return next(action);
		}

		const currentStore = store.getState();

		if (!currentStore.media[action.key]) {
			const newAction = Object.assign({}, action, {
				value: URL.createObjectURL(new Blob([action.value as ArrayBuffer], { type: "image/*" })),
			});
			return next(newAction);
		}

		if (currentStore.media[action.key] && !action.value) {
			URL.revokeObjectURL(currentStore.media[action.key]);
			return next(action);
		}

		next(Object.assign({}, action, {
			value: currentStore.media[action.key]
		}));
	}
}
