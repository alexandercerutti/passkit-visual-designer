import * as ReactDOM from "react-dom";
import * as React from "react";
import "./styles.less";
import App from "../App";
import localForage from "localforage";

localForage.config();

const loaderFace = document.getElementById("loader-face");

loaderFace.addEventListener("animationend", function () {
	this.style.display = "none";
});

ReactDOM.render(<App />, document.getElementById("root"), () => {
	loaderFace.style.animationPlayState = "running";
});
