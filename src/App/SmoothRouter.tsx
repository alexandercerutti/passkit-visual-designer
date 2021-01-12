import * as React from "react";
import { BrowserRouter as Router, Switch, RouteChildrenProps, withRouter } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./style.less";

const RoutesSwitchWithTransition = withRouter(({ location, children }: React.PropsWithChildren<RouteChildrenProps>) => (
	<SwitchTransition>
		<CSSTransition
			// Fallback here is needed to avoid weird animation looping (https://git.io/Jvbpa)
			key={location.key || ""}
			timeout={1000}
			classNames="fade"
		>
			{/* Passing Switch the immutable object location from react-router-dom */}
			<Switch location={location}>
				{children}
			</Switch>
		</CSSTransition>
	</SwitchTransition>
));

export default function SmoothRouter(props: React.PropsWithChildren<{}>) {
	return (
		<Router>
			<RoutesSwitchWithTransition {...props} />
		</Router>
	);
}
