import * as React from "react";

/**
 * Just a common container for all the pages. Nothing else.
 * Move along. Nothing to see here.
 *
 * @param props
 * @returns
 */

export function PageContainer(props: React.PropsWithChildren<{}>) {
	return <div className="page">{props.children}</div>;
}
