import * as React from "react";
import "./style.less";
import { FieldsArrowIcon } from "../../../../../icons";

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
	const canMoveUp = (
		props.allowedDirections !== Directions.NONE && (
			props.allowedDirections === Directions.UP ||
			props.allowedDirections === Directions.BOTH
		)
	);
	const canMoveDown = (
		props.allowedDirections !== Directions.NONE && (
			props.allowedDirections === Directions.DOWN ||
			props.allowedDirections === Directions.BOTH
		)
	);

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
