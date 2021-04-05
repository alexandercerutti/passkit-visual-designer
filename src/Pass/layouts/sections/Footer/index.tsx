import * as React from "react";
import "./style.less";
import { useRegistrations } from "../useRegistrations";
import { FieldKind } from "../../../../model";
import ImageField, { ImageFieldProps } from "../../components/ImageField";
import { AppIconEmpty } from "./icons";

interface FooterProps extends ImageFieldProps {
	allowFooterImage?: boolean;
	icon?: string;
}

export default function Footer(props: React.PropsWithChildren<FooterProps>) {
	const { children = null } = props;
	let footerImage: JSX.Element = null;

	if (props.allowFooterImage) {
		const [footerImageClickHandler] = useRegistrations([[FieldKind.IMAGE, "footerImage"]]);

		footerImage = <ImageField src={props.src} onClick={() => footerImageClickHandler(null)} />;
	}

	const [iconClickHandler] = useRegistrations([[FieldKind.IMAGE, "icon"]]);

	return (
		<div className="footer">
			<div className="grid">
				<div className="icon" onClick={() => iconClickHandler("icon")}>
					{props.icon ? <img alt="icon" src={props.icon} /> : <AppIconEmpty />}
				</div>
				{footerImage}
				{children}
			</div>
		</div>
	);
}
