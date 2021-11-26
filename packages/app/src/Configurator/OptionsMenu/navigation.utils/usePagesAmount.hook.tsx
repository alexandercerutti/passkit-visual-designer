import * as React from "react";
import { registerListener, reset } from "./navigation.memory";

export default function usePagesAmount() {
	const [amount, updateAmount] = React.useState(0);

	React.useEffect(() => {
		/** Reset pages on unmound*/
		return reset;
	}, []);

	const onUpdate = React.useCallback((amount: number) => {
		updateAmount(amount);
	}, []);

	React.useEffect(() => {
		registerListener(onUpdate);
	}, []);

	return amount;
}
