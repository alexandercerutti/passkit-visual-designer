import * as React from "react";
import { PassProps } from "./base";
import { PassHeader } from "./Components/Header";

interface BoardingPassProps extends PassProps {
	subKind: "PKTransitTypeAir" | "PKTransitTypeBoat" | "PKTransitTypeBus" | "PKTransitTypeGeneric" | "PKTransitTypeTrain";
}

export default class BoardingPass extends React.Component<BoardingPassProps> {
	constructor(props: BoardingPassProps) {
		super(props);
	}

	renderPKTransitTypeAir() {
		return (
			<>
				<PassHeader />
			</>
		);
	}

	renderPKTransitTypeBoat() {
		return (
			<>
				<PassHeader />
			</>
		);
	}

	renderPKTransitTypeBus() {
		return (
			<>
				<PassHeader />
			</>
		);
	}

	renderPKTransitTypeGeneric() {
		return (
			<>
				<PassHeader />
				{"BoardingPass"}
			</>
		);
	}

	renderPKTransitTypeTrain() {
		return (
			<>
				<PassHeader />
			</>
		);
	}

	render(): JSX.Element {
		if (this.props.subKind) {
			return this[`render${this.props.subKind}`]();
		}

		return this.renderPKTransitTypeGeneric();
	}
}
