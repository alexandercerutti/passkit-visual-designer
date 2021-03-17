import * as ReactDOM from "react-dom";
import * as React from "react";
import "./styles.less";
import App from "../App";
import localForage from "localforage";

localForage.config();

ReactDOM.render(<App />, document.getElementById("root"));
