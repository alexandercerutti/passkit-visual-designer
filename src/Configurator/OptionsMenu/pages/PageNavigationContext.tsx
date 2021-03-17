import * as React from "react";
import { PageNavigation } from "./usePageFactory";

const noop = () => void 0;

export default React.createContext<PageNavigation>({
	requestPageClosing: noop,
	requestPageCreation: noop,
});
