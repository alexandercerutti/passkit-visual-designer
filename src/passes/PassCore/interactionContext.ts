import * as React from "react";
import { onComponentSelection, onRegister } from "../Areas/useRegistrations";

/**
 * Base pass context. This is used to pass to all the
 * passes the registration and interaction functions
 */

export interface InteractionContext {
	onFieldSelect?: onComponentSelection;
	registerField?: onRegister;
}

export const { Provider, Consumer } = React.createContext<InteractionContext>({});
