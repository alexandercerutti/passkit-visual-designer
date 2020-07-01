import * as React from "react";
import "./style.less";
import { DeleteFieldIcon, ListAddProp } from "./icons";
import FieldOrderHandler, { Directions } from "./FieldOrderHandler";

interface FieldOptionsProps {
	deleteField(key: string): void;
	changeFieldOrder(fromIndex: number, of: number): void;
	onPropsEditClick(): void;
	fieldKey: string;
	fieldIndex: number;
	isUpperBoundary: boolean;
	isLowerBoundary: boolean;
}

export default function FieldOptionsBar(props: FieldOptionsProps) {
	const allowedMovingDirections = (
		props.isLowerBoundary && props.isUpperBoundary ? Directions.NONE :
			props.isLowerBoundary ? Directions.UP :
				props.isUpperBoundary ? Directions.DOWN :
					Directions.BOTH
	);

	return (
		<>
			<div className="field-options-bar">
				<div className="field-delete" onClick={() => props.deleteField(props.fieldKey)}>
					<DeleteFieldIcon className="danger" />
				</div>
				<FieldOrderHandler
					allowedDirections={allowedMovingDirections}
					fieldIndex={props.fieldIndex}
					requestFieldOrderChange={props.changeFieldOrder}
				/>
				<div
					className="property-add-row"
					onClick={props.onPropsEditClick}
				>
					<ListAddProp className="add" />
				</div>
			</div>
			{/* 			<AvailablePropertiesMenu
				className={!shouldShowAddMenu && "hidden" || ""}
				appliedProperties={props.usedProperties}
				onPropertySelect={onPropertySelectHandler.current}
			/> */}
		</>
	);
}
