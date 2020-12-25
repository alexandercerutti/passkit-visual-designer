import * as ReactDOM from "react-dom";
import * as React from "react";
import "./styles.less";
import App from "../App";
import localForage from "localforage";
import * as Store from "../store";

localForage.config();

const loaderFace = document.getElementById("loader-face");

loaderFace.addEventListener("animationend", function () {
	this.style.display = "none";
});

Promise.all([
	localForage.getItem<Store.Forage.ForageStructure["projects"]>("projects"),
	// add more slices of store to read here...
]).then((data) => {
	ReactDOM.render(
		<App
			projects={data[0] ?? {}}
		/>,
		document.getElementById("root"),
		() => {
			loaderFace.style.animationPlayState = "running";
		}
	);
});
