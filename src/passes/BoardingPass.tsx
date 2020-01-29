import * as React from "react";
import { PassProps } from "./base";

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
			</>
		);
	}

	renderPKTransitTypeBoat() {
		return (
			<>
			</>
		);
	}

	renderPKTransitTypeBus() {
		return (
			<>
			</>
		);
	}

	renderPKTransitTypeGeneric() {
		return (
			<>
				{"BoardingPass"}
			</>
		);
	}

	renderPKTransitTypeTrain() {
		return (
			<>
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
