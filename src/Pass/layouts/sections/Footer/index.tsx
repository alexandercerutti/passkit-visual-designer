import * as React from "react";
import "./style.less";
import { useRegistrations, RegistrableComponent } from "../useRegistrations";
import { FieldKind } from "../../../../model";
import ImageField, { ImageFieldProps } from "../../components/ImageField";

interface FooterProps extends Pick<RegistrableComponent, "register">, ImageFieldProps {
	allowFooterImage?: boolean;
}

export default function Footer(props: React.PropsWithChildren<FooterProps>) {
	const { children = null } = props;
	let footerImage: JSX.Element = null;

	if (props.allowFooterImage) {
		const [footerClickHandler] = useRegistrations(props.register, [
			[FieldKind.IMAGE, "footerImage"]
		]);

		footerImage = (
			<ImageField
				src={props.src}
				onClick={() => footerClickHandler(null)}
			/>
		);
	}

	return (
		<div className="footer">
			{
				/*
				 * This internal div, allows us to have an
				 * image field with a width equal to the
				 * barcode's.
				 */
			}
			<div className="grid">
				{footerImage}
				{children}
			</div>
		</div>
	);
}
