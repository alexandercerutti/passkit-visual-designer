import * as React from "react";
import type { onRegistration } from "./layouts/sections/useFieldRegistration";

/**
 * InteractionContext is a way to directly pass the registration
 * method through all the components in Pass.
 *
 * It is used to have a function, provided by the Configurator,
 * that will register all the components that will use the hook
 * `useRegistrations`.
 */

export default React.createContext<onRegistration>(undefined);
