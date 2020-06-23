import * as React from "react";
import "./style.less";
import { FieldsArrowIcon } from "../../../../icons";

export const enum Directions {
	UP,
	DOWN,
	BOTH,
	NONE
}

interface Props {
	allowedDirections: Directions;
	fieldIndex: number;

	requestFieldOrderChange(fieldIndex: number, of: number): void;
}

export default function FieldOrderHandler(props: Props) {
	const canMoveUp = canMoveInDirection(props.allowedDirections, Directions.UP);
	const canMoveDown = canMoveInDirection(props.allowedDirections, Directions.DOWN);

	return (
		<div className="field-order-handler">
			<FieldsArrowIcon
				className={!canMoveUp && "disabled" || undefined}
				onClick={() => canMoveUp && props.requestFieldOrderChange(props.fieldIndex, -1)}
			/>
			{props.fieldIndex + 1}
			<FieldsArrowIcon
				className={!canMoveDown && "disabled" || undefined}
				onClick={() => canMoveDown && props.requestFieldOrderChange(props.fieldIndex, 1)}
			/>
		</div>
	);
}

function canMoveInDirection(directionProp: Directions, targetDirection: Directions) {
	return (
		directionProp !== Directions.NONE && (
			directionProp === targetDirection ||
			directionProp === Directions.BOTH
		)
	);
}
