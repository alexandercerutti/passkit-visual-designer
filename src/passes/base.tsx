import * as React from "react";
import "./base.less";
import { PassKind } from "../model";
import BoardingPass from "./BoardingPass";

export interface PassProps {
	kind: PassKind;
	subKind?: any;
	onClick?(evt: React.MouseEvent): void;
}

export default class Pass extends React.Component<PassProps> {
	constructor(props: any) {
		super(props);
	}

	deriveComponentFromKind(kind: PassKind): React.ComponentType<PassProps> {
		switch (kind) {
			case PassKind.BOARDING_PASS:
				return BoardingPass

			default:
				return BoardingPass;
		}
	}

	render(): JSX.Element {
		const PassComponent = this.deriveComponentFromKind(this.props.kind);
		const PassProps = ({ kind, subKind }: PassProps) => ({ kind, subKind });

		console.log(this.props, PassComponent);

		return (
			<div className={`pass select ${this.props.kind.toLowerCase()}`} onClick={this.props.onClick}>
				<div className="content">
					<PassComponent {...PassProps(this.props)} />
				</div>
			</div>
		);
	}
}
