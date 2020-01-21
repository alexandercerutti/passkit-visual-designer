import * as React from "react";
import "./base.less";

interface BasePassProps {

}

export default class Pass extends React.Component<BasePassProps> {
	constructor(props: any) {
		super(props);
	}

	render(): JSX.Element {
		return (
			<div className="base-pass">
				<div className="base-content">
					Test
				</div>
			</div>
		);
	}
}
