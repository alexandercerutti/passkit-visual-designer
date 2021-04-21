import * as React from "react";

const noop = () => void 0;

export interface PageNavigation {
	requestPageCreation(): void;
	requestPageClosing(): void;
}

export default React.createContext<PageNavigation>({
	requestPageClosing: noop,
	requestPageCreation: noop,
});
