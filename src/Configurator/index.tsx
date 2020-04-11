import * as React from "react";
import "./style.less";
import Viewer, { ViewerProps } from "./Viewer";
import OptionsBar from "./OptionsBar";
import OptionsMenu from "./OptionsMenu";
import { FieldKind } from "../model";
import { InteractionContext } from "../passes/PassCore/interactionContext";

interface ConfiguratorProps extends ViewerProps { }
interface ConfiguratorState {
	selectedFieldId?: string;
}

export default class Configurator extends React.Component<ConfiguratorProps, ConfiguratorState> implements InteractionContext {
	constructor(props: ConfiguratorProps) {
		super(props);

		this.registerField = this.registerField.bind(this);
		this.onFieldSelect = this.onFieldSelect.bind(this);
		this.onVoidClick = this.onVoidClick.bind(this);

		this.state = {
			selectedFieldId: null,
		};
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
		this.setState({ selectedFieldId: id });
		console.log(id, "selected");
	}

	/**
	 * Allows clicking on the void area
	 * to deselect around the pass to remove
	 * field selection
	 *
	 * @param e
	 */

	onVoidClick(e: React.MouseEvent) {
		if (e.target !== e.currentTarget) {
			return;
		}

		this.setState({ selectedFieldId: null });
	}

	render() {
		return (
			<div id="configurator">
				<div className="screen">
					<Viewer
						{...this.props}
						onFieldSelect={this.onFieldSelect}
						registerField={this.registerField}
						onVoidClick={this.onVoidClick}
					/>
					<OptionsBar />
				</div>
				<div className="config-panel">
					<OptionsMenu
						selection={this.state.selectedFieldId}
					/>
				</div>
			</div>
		);
	}
}
