import * as React from "react";
import { registerListener } from "./navigation.memory";

export default function usePagesAmount() {
	const [amount, updateAmount] = React.useState(0);

	const onUpdate = React.useCallback((amount: number) => {
		updateAmount(amount);
	}, []);

	React.useEffect(() => {
		registerListener(onUpdate);
	}, []);

	return amount;
}
