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

	const registrationsDescriptors: Parameters<typeof useRegistrations>[0] = [
		[FieldKind.IMAGE, "icon"],
	];

	if (props.allowFooterImage) {
		registrationsDescriptors.push([FieldKind.IMAGE, "footerImage"]);
	}

	const [iconClickHandler, footerImageClickHandler] = useRegistrations(registrationsDescriptors);

	return (
		<div className="footer">
			<div className="grid">
				<div className="icon" onClick={() => iconClickHandler("icon")}>
					{props.icon ? <img alt="icon" src={props.icon} /> : <AppIconEmpty />}
				</div>
				{(footerImageClickHandler && (
					<ImageField src={props.src} onClick={() => footerImageClickHandler(null)} />
				)) ||
					null}
				{children}
			</div>
		</div>
	);
}
