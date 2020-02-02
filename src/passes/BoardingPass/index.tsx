import * as React from "react";
import { PassProps } from "../base";
import { PassHeader } from "../Components/Header";

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
				<PassHeader
					headerFieldsData={[{
						label: "Data",
						fieldKey: "departing_date",
						value: "10/04/1996",
					}, {
						label: "Ora",
						fieldKey: "departing_time",
						value: "10:30",
					}, {
						label: "test",
						fieldKey: "departing_time",
						value: "10:30",
					}]}
				/>
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
