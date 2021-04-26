import * as React from "react";
import { v1 as uuid } from "uuid";
import { addPage, removePageChain, sendUpdates } from "./navigation.memory";

export default function usePageRelation<T extends Object>(): [boolean, Function, Function, T] {
	const [isOpen, setPageOpenness] = React.useState(false);
	const pageID = React.useRef(uuid());
	const contextualProps = React.useRef<T>();

	const openPage = React.useCallback((pageProps: T) => {
		setPageOpenness(true);
		contextualProps.current = pageProps;
		addPage(pageID.current);
		sendUpdates();
	}, []);

	const closePage = React.useCallback(() => {
		setPageOpenness(false);
		contextualProps.current = undefined;
		removePageChain(pageID.current);
		sendUpdates();
	}, []);

	return [isOpen, openPage, closePage, contextualProps.current];
}
