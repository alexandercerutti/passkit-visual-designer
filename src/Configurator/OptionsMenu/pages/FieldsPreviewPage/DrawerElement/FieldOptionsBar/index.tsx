import * as React from "react";
import "./style.less";
import { DeleteFieldIcon, ListAddProp } from "./icons";
import FieldOrderHandler, { Directions } from "./FieldOrderHandler";

interface FieldOptionsProps {
	deleteField(fieldUUID: string): void;
	requestFieldOrderChange(of: number): void;
	onPropsEditClick(): void;
	fieldUUID: string;
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
				<div className="field-delete" onClick={() => props.deleteField(props.fieldUUID)}>
					<DeleteFieldIcon className="danger" />
				</div>
				<FieldOrderHandler
					allowedDirections={allowedMovingDirections}
					requestFieldOrderChange={props.requestFieldOrderChange}
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
