import * as React from "react";
import { PKTransitType } from "../../../../constants";

interface BoardingIconProps {
	className?: string;
	width: number;
	height: number;
	fill?: string;
	style?: React.CSSProperties;
}

const FlightIcon = (props: BoardingIconProps) => (
	<svg
		id="flight"
		width={`${props.width}px`}
		height={`${props.height}px`}
		viewBox="0 0 73 73"
		style={{ fill: props.fill }}
		className={props.className || ""}
	>
		<path
			d="M23,0 L23,2 L34,26.5 L34,31.5 L30,33.5 L14,34 L5,24 L0,24 L0,25.5 L3,34 C2.91296557,34.6921264 2.7462989,35.1921264 2.5,35.5 C2.2537011,35.8078736 1.7537011,36.141207 1,36.5 C1.77184994,36.7674041 2.27184994,37.1007374 2.5,37.5 C2.72815006,37.8992626 2.89481672,38.7325959 3,40 L0,48 L0,50 L5,50 L14,40 L30,40.5 L34,42.5 L34,47.5 L23,71 L23,73 L29,73 L35,65 L41,65 L42,64 L42,62 L40,62 L38,61 L43,55 L49,54 L50,53 L50,52 L49,51 L46,51 L46,50 L53,41 L68,39.5 L73,38 L73,35 L68,33.5 L53,32 L46,24 L46,23 L49,23 L50,22 L50,21 L49,20 L43,19 L38,13 L40,12 L42,12 L42,10 L41,9 L35,9 L29,0 L23,0 Z"
			id="Path"
		/>
	</svg>
);

const BoatIcon = (props: BoardingIconProps) => (
	<svg
		id="boat"
		x="0px"
		y="0px"
		width={`${props.width}px`}
		height={`${props.height}px`}
		viewBox="0 0 50 50"
		className={props.className || ""}
	>
		<g>
			<path
				fill={props.fill}
				d="M30.311,11.707v3.289h6.658v-3.289H30.311z M28.312,14.996v-3.329h-6.618v3.329H28.312z M17.06,4.256 v-3.27h3.309l-0.007,3.27h9.222v-3.27h3.402v3.27h2.657v4.78h3.349l2.191,16.673l-14.855-8.43h-2.656l-14.575,8.43l1.911-16.673 h3.356v-4.78H17.06z M19.657,15.036v-3.409h-6.658v3.409H19.657z"
			/>
			<polygon
				fill={props.fill}
				points="6.353,48.334 1,35.576 1,32.974 23.112,20.309 25.07,43.167 26.888,20.309 49,32.974 49,35.576 43.554,48.334"
			/>
		</g>
	</svg>
);

const RailIcon = (props: BoardingIconProps) => (
	<svg
		id="rail"
		x="0px"
		y="0px"
		width={`${props.width}px`}
		height={`${props.height}px`}
		viewBox="0 0 36 36"
		className={props.className || ""}
	>
		<path
			fill={props.fill}
			d="M29.768,4.419v17.125c0,2.439-2.758,4.419-6.153,4.419H12.386c-3.396,0-6.148-1.979-6.148-4.419V4.419 C6.238,1.979,8.99,0,12.386,0h11.228C27.01,0,29.768,1.979,29.768,4.419z M27.338,20.972c0-1.305-1.06-2.363-2.368-2.363 c-1.305,0-2.363,1.059-2.363,2.363c0,1.31,1.059,2.368,2.363,2.368C26.278,23.34,27.338,22.281,27.338,20.972z M26.698,14.9 V9.273c0-1.094-0.716-1.979-1.596-1.979H10.898c-0.88,0-1.591,0.885-1.591,1.979V14.9c0,1.094,0.711,1.979,1.591,1.979h14.205 C25.982,16.88,26.698,15.995,26.698,14.9z M23.757,4.062V3.105c0-0.798-0.69-1.438-1.534-1.438h-8.44 c-0.849,0-1.535,0.639-1.535,1.438v0.957c0,0.798,0.686,1.442,1.535,1.442h8.44C23.066,5.504,23.757,4.859,23.757,4.062z M13.399,20.972c0-1.305-1.059-2.363-2.368-2.363c-1.304,0-2.363,1.059-2.363,2.363c0,1.31,1.059,2.368,2.363,2.368C12.34,23.34,13.399,22.281,13.399,20.972z"
		/>
		<line
			stroke={props.fill}
			strokeWidth="3"
			strokeMiterlimit="10"
			x1="10.172"
			y1="31.014"
			x2="25.39"
			y2="31.014"
		/>
		<g>
			<defs>
				<rect id="railscliprect" x="5.596" y="26.793" width="24.809" height="9.207" />
			</defs>
			<clipPath id="railsarea">
				<use href="#railscliprect" overflow="visible" />
			</clipPath>
			<g clipPath="url(#railsarea)">
				<line
					stroke={props.fill}
					strokeWidth="3"
					strokeMiterlimit="10"
					x1="14.091"
					y1="25.643"
					x2="7.259"
					y2="36.768"
				/>
				<line
					stroke={props.fill}
					strokeWidth="3"
					strokeMiterlimit="10"
					x1="21.581"
					y1="25.643"
					x2="28.413"
					y2="36.768"
				/>
			</g>
		</g>
	</svg>
);

const BusIcon = (props: BoardingIconProps) => (
	<svg
		id="bus"
		x="0px"
		y="0px"
		width={`${props.width}px`}
		height={`${props.height}px`}
		viewBox="0 0 50 50"
		className={props.className || ""}
	>
		<path
			fill={props.fill}
			d="M43.851,47.779c0,1.227-0.944,2.221-2.115,2.221h-2.643c-1.163,0-2.114-0.994-2.114-2.221l-0.007-2.784 h6.871L43.851,47.779z"
		/>
		<path
			fill={props.fill}
			d="M13,44.995l0.014,2.784C13.014,49.006,12.07,50,10.9,50H8.257c-1.163,0-2.115-0.994-2.115-2.221v-2.784H13 z"
		/>
		<path
			fill={props.fill}
			d="M46.557,9.226V44.29c0,0.269-0.507,0.685-0.831,0.705h-1.883h-6.871H13H6.142H4.155 c-0.395,0-0.712-0.317-0.712-0.705l0.07-35.1C4,1.896,13.874,0,14.262,0h20.546C35.202,0,46.437,1.783,46.557,9.226z M42.617,35.847c0-1.818-1.474-3.291-3.285-3.291c-1.818,0-3.291,1.473-3.291,3.291c0,1.812,1.473,3.284,3.291,3.284 C41.144,39.131,42.617,37.658,42.617,35.847z M41.56,24.097V14.35c0-1.17-0.944-2.114-2.114-2.114H10.547 c-1.163,0-2.114,0.944-2.114,2.114v9.748c0,1.17,0.951,2.115,2.114,2.115h28.898C40.615,26.212,41.56,25.268,41.56,24.097z M36.746,8.472v-2.7c0-0.388-0.317-0.705-0.705-0.705H13.959c-0.395,0-0.705,0.317-0.705,0.705v2.7 c0,0.395,0.31,0.705,0.705,0.705h22.082C36.429,9.176,36.746,8.866,36.746,8.472z M13.959,35.847c0-1.818-1.473-3.291-3.292-3.291 c-1.819,0-3.292,1.473-3.292,3.291c0,1.812,1.473,3.284,3.292,3.284C12.486,39.131,13.959,37.658,13.959,35.847z"
		/>
	</svg>
);

const GenericIcon = (props: BoardingIconProps) => (
	<svg
		id="generic"
		x="0px"
		y="0px"
		width={`${props.width}px`}
		height={`${props.height}px`}
		viewBox="0 0 50 50"
		className={props.className || ""}
	>
		<path
			fill={props.fill}
			d="M48.557,25.143L33.478,40.222h-9.865l11.385-11.385H2.275v-7.389h32.723L23.613,10.063h9.865L48.557,25.143z"
		/>
	</svg>
);

const PKTransitIconsMap: { [K in PKTransitType]: React.ComponentType<BoardingIconProps> } = {
	[PKTransitType.Generic]: GenericIcon,
	[PKTransitType.Bus]: BusIcon,
	[PKTransitType.Train]: RailIcon,
	[PKTransitType.Air]: FlightIcon,
	[PKTransitType.Boat]: BoatIcon,
};

export function PKTransitIcon({ type, ...props }: BoardingIconProps & { type: PKTransitType }) {
	const WrappedIcon = PKTransitIconsMap[type];
	return (
		<WrappedIcon
			fill={"var(--pass-label-color)"}
			width={25}
			height={25}
			className="icon"
			{...props}
		/>
	);
}
