import * as React from "react";
import usePageRelation from "./usePageRelation.hook";

export interface NavigableProps {
	pagesStatuses: boolean[];
	openPage(index: number): void;
	closePage(index: number): void;
}

/**
 * An HOC to create relations between pages
 *
 * @param Element Main element
 * @param args elements linked. Just for reference when reading the code. We could have had used also an array of strings, potentially.
 */

export default function navigable<T extends Partial<NavigableProps>>(
	Element: React.ComponentType<T>,
	...args: React.ComponentType<any>[]
) {
	return function (props: T) {
		const controllers = args.map(usePageRelation);

		const openPage = React.useCallback((index: number) => {
			const [, open] = controllers[index];
			open();
		}, []);

		const closePage = React.useCallback((index: number) => {
			const [, , close] = controllers[index];
			close();
		}, []);

		return (
			<>
				<Element
					{...props}
					pagesStatuses={controllers.map((controller) => controller[0])}
					openPage={openPage}
					closePage={closePage}
				/>
			</>
		);
	};
}
