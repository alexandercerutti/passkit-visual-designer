import * as React from "react";
import "./style.less";
import Viewer, { ViewerProps } from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";
import { FieldKind } from "../model";
import { InteractionContext } from "../passes/PassCore/interactionContext";

interface ConfiguratorProps extends ViewerProps { }

export default class Configurator extends React.Component<ConfiguratorProps> implements InteractionContext {
	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
	}

	/**
	 * This function role is to register the fields that
	 * will be shown in the OptionsMenu
	 *
	 * @param kind
	 * @param id
	 */

	registerField(kind: FieldKind, id: string): boolean {
		return true;
	}

	/**
	 * This function role is to notify the OptionsMenu
	 * to highlight the linked field
	 */

	onFieldSelect(id: string): void {

	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...this.props}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
					/>
					<OptionsBar />
				</div>
				<div className="config-panel">
					<OptionsMenu />
				</div>
			</div>
		);
	}
}
