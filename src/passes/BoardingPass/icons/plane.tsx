import * as React from "react";

interface PlaneIconProps {
	width: number;
	height: number;
	fill: string;
}

export default (props: PlaneIconProps) =>
	<svg width={`${props.width}px`} height={`${props.height}px`} viewBox="0 0 73 73" style={{ fill: props.fill, marginTop: "12px" }}>
		<path d="M23,0 L23,2 L34,26.5 L34,31.5 L30,33.5 L14,34 L5,24 L0,24 L0,25.5 L3,34 C2.91296557,34.6921264 2.7462989,35.1921264 2.5,35.5 C2.2537011,35.8078736 1.7537011,36.141207 1,36.5 C1.77184994,36.7674041 2.27184994,37.1007374 2.5,37.5 C2.72815006,37.8992626 2.89481672,38.7325959 3,40 L0,48 L0,50 L5,50 L14,40 L30,40.5 L34,42.5 L34,47.5 L23,71 L23,73 L29,73 L35,65 L41,65 L42,64 L42,62 L40,62 L38,61 L43,55 L49,54 L50,53 L50,52 L49,51 L46,51 L46,50 L53,41 L68,39.5 L73,38 L73,35 L68,33.5 L53,32 L46,24 L46,23 L49,23 L50,22 L50,21 L49,20 L43,19 L38,13 L40,12 L42,12 L42,10 L41,9 L35,9 L29,0 L23,0 Z" id="Path" />
	</svg>;
