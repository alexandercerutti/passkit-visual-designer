import * as React from "react";
import { FillableComponent } from "../FillableComponent";
import withRegistration from "../withRegistration";
import { FieldKind } from "../../../model";

interface ImageField extends FillableComponent {
	className?: string;
	width?: string;
	height?: string;
	src?: string;
}

function renderOnSrc(props: Pick<ImageField, "src" | "width" | "height">) {
	if (!props.src) {
		return null;
	}

	return (
		<img {...props} />
	)
}

function PureImageField(props: ImageField) {
	return (
		<div className={`${props.className} image-field`.trim()} >
			{renderOnSrc({ src: props.src, width: props.width, height: props.height })}
		</div>
	);
}

export default withRegistration(PureImageField, FieldKind.IMAGE);
