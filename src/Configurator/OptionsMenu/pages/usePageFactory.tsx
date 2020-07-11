import { RequestPageCreationSignature } from "./pages";
import * as React from "react";

type ContextProps<T extends Object> = Partial<{
	[key in keyof T]: T[key];
}> & {
	onChange: Function;
}

type PAGE_COMPONENT_SIGNATURE = Parameters<RequestPageCreationSignature>[1];

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

export default function usePageFactory<T extends PAGE_COMPONENT_SIGNATURE>(
	component: T,
	initProps: Partial<React.ComponentProps<T>>,
	onChange: ContextProps<typeof initProps>["onChange"]
) {
	const getContextProps = React.useCallback((): ContextProps<typeof initProps> => {
		return {
			...initProps,
			onChange: onChange ?? (() => { })
		}
	}, [initProps, onChange]);

	const creationHandler = React.useCallback((key: string, requestFunction: RequestPageCreationSignature) => {
		requestFunction(key, component, getContextProps)
	}, [initProps, getContextProps]);

	return creationHandler;
}
