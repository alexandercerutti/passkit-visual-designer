import * as React from "react";

export type ContextPropsGetter<P extends Object> = () => ContextProps<P>;

export type ContextProps<T extends Object> = Partial<
	{
		[key in keyof T]: T[key];
	}
> & {
	onChange: Function;
};

export interface PageProps {
	name: string;
	onChange: Function;
}

export type RequestPageCreationFunction = (
	identifier: string,
	PageElement: React.ComponentType<PageProps>,
	getContextProps?: ContextPropsGetter<React.ComponentProps<typeof PageElement>>
) => void;

export interface PageNavigation {
	requestPageCreation: RequestPageCreationFunction;
	requestPageClosing(cancelSelection?: boolean): void;
}

type PAGE_COMPONENT_SIGNATURE = Parameters<RequestPageCreationFunction>[1];

/**
 * This hooks provide a transparent way to create getContextProps
 * function to return fresh props without repeating the same chunk
 * again and again.
 *
 * It also creates a function to request later the page creation
 * with the props function directly attached (without expose it).
 *
 * This factory hook solves the following problem: menu pages cannot
 * get fresh props as they are created in components created by the menu
 * and rendered in the menu itself.
 * For this reason, along with page identifier and the component to render,
 * we pass a function (getContextProps) to get fresh props, that will be invoked on rendering.
 *
 * Then getContextProps will return the props from the component and the change function
 * the page can invoke to update "parent" data.
 *
 * @param component
 * @param initProps
 * @param onChange
 */

export default function usePageFactory<T extends PAGE_COMPONENT_SIGNATURE>(
	component: T,
	initProps: Partial<React.ComponentProps<T>>,
	onChange: ContextProps<typeof initProps>["onChange"] = () => {}
) {
	const getContextProps = React.useCallback((): ContextProps<typeof initProps> => {
		return {
			...initProps,
			onChange,
		};
	}, [initProps, onChange]);

	const creationHandler = React.useCallback(
		(key: string, requestFunction: RequestPageCreationFunction) => {
			requestFunction(key, component, getContextProps);
		},
		[initProps, getContextProps]
	);

	return creationHandler;
}
