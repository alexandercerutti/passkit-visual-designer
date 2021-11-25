import * as React from "react";

export function AppIconEmpty(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.98 37.89" {...props}>
			<path
				id="mid_circle"
				className="cls-1"
				d="M19 9.3a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0119 9.3m0-.1a9.85 9.85 0 109.85 9.85A9.86 9.86 0 0019 9.2z"
			/>
			<ellipse id="outer_circle" className="cls-2" cx={19.03} cy={18.95} rx={16.44} ry={16.27} />
			<path
				id="inner_Circle"
				className="cls-1"
				d="M19 12a6.9 6.9 0 11-6.9 6.9A6.91 6.91 0 0119 12m0-.1a7 7 0 107 7 7 7 0 00-7-7z"
			/>
			<path id="ve_mid" className="cls-2" d="M18.99.05v37.73" />
			<path id="ve_rt_1_Line" className="cls-2" d="M26.05.09v37.79" />
			<path id="ve_rt_2_Line" className="cls-2" d="M28.88 37.84V.05" />
			<path id="ve_lt_2_Line" className="cls-2" d="M12.08.05v37.79" />
			<path id="ve_lt_1_Line" className="cls-2" d="M9.17.05v37.73" />
			<path id="ho_tp_1_Line" className="cls-2" d="M.01 9.16h37.85" />
			<path id="ho_tp_2_Line" className="cls-2" d="M0 11.99h37.87" />
			<path id="ho_mid" d="M.09 19.05h37.8" />
			<path id="ho_bm_2_Line" className="cls-2" d="M.05 25.89h37.88" />
			<path id="ho_bm_1_Line" className="cls-2" d="M.06 28.8h37.87" />
			<path id="diag_ltr" className="cls-2" d="M35.53 35.34L2.53 2.6" />
			<path id="diag_rtl" className="cls-2" d="M2.59 35.22L35.46 2.68" />
			<path
				className="cls-2"
				d="M29 37.84H9.43c-5.56.11-9.47-3.4-9.28-9.6V8.93C.14 4.3 3.15.05 9.09.05h19.83c5.29 0 8.95 3.18 8.95 8.88l.06 19.32c.23 6.2-3.53 9.37-8.93 9.59z"
			/>
			<path className="cls-2" d="M2.59 2.68h32.88v32.54H2.59z" />
		</svg>
	);
}
