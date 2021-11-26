import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.less";
import { PassKind, PassMixedProps } from "@pkvd/PKPass";
import PassList from "./PassList";
import SelectablePass, { getAlternativesByKind } from "./SelectablePass";
import * as Store from "@pkvd/store";

// Webpack declared
declare const __DEV__: boolean;

export default function PassSelector(props: {}) {
	const [selectedKind, setKind] = React.useState<PassKind>(undefined);
	const navigate = useNavigate();
	const setPassProps = useDispatch();

	const onPassSelect = React.useCallback((passProps: PassMixedProps) => {
		if (__DEV__) {
			console.log("Performed selection of", passProps.kind);
		}

		setKind((previous) => (previous === passProps.kind ? undefined : passProps.kind));
	}, []);

	const onAlternativeSelection = React.useCallback((passProps: PassMixedProps) => {
		setPassProps(Store.Pass.setPropsBatch(passProps));
		navigate("/creator", { replace: true });
	}, []);

	const availableAlternatives = getAlternativesByKind(selectedKind) || [];

	const passes = Object.entries(PassKind).map(([_, pass]) => {
		return <SelectablePass key={pass} name={pass} kind={pass} />;
	});

	const alternativesList = availableAlternatives.map((alternative) => {
		return (
			<SelectablePass
				key={alternative.name}
				name={alternative.name}
				kind={selectedKind}
				{...alternative.specificProps}
			/>
		);
	});

	const AlternativesListComponent =
		(alternativesList.length && (
			<PassList requiresAttention onPassSelect={onAlternativeSelection}>
				{alternativesList}
			</PassList>
		)) ||
		null;

	return (
		<div id="selector-app">
			<header>
				<h2>Select your pass model</h2>
			</header>
			<div className="selection-window">
				<PassList onPassSelect={onPassSelect} selectedKind={selectedKind}>
					{passes}
				</PassList>
				{AlternativesListComponent}
			</div>
		</div>
	);
}
