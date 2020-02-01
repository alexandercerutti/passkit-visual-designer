import * as React from "react";
import { FillableComponent } from "../FillableComponent";
import EmptyField from ".";

export default function withFallback<P extends FillableComponent>(WrappedComponent: React.ComponentType<P>, fallbackProp: keyof P) {
	return (props: P) => {
		if (!props[fallbackProp]) {
			return <EmptyField {...props} />;
		}

		return <WrappedComponent {...props} />;
	}
}
