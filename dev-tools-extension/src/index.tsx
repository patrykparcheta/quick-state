import React from "react";
import ReactDOM from "react-dom/client";
import {DevTools} from "./app";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<DevTools />
	</React.StrictMode>
);
