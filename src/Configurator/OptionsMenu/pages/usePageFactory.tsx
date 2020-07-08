import { RequestPageCreationSignature } from "./pages";
import * as React from "react";

interface ContextProps<T> {
	data: T;
	onChange: Function;
}

/**
 * This hooks provide a transparent way to create getContextProps
 * function to return fresh props without repeating the same chunk
 * again and again.
 *
 * It also creates a function to request later the page creation
 * with the props function directly attached (without expose it)
 *
 * @param component
 * @param initProps
 * @param onChange
 */

export default function usePageFactory<T>(
	component: Parameters<RequestPageCreationSignature>[1],
	initProps: ContextProps<T>["data"],
	onChange: ContextProps<T>["onChange"]
) {
	const getContextProps = React.useCallback((): ContextProps<T> => {
		return {
			data: initProps,
			onChange: onChange ?? (() => { })
		};
	}, [initProps, onChange]);

	const creationHandler = React.useCallback((key: string, requestFunction: RequestPageCreationSignature) => {
		requestFunction(key, component, getContextProps)
	}, [initProps, getContextProps]);

	return creationHandler;
}
