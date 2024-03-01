import React from "react";
import {Store} from "./types";

export const getWithStateProviderHoc =
	<State extends Object>(Provider: Store<State>["Provider"]) =>
	<Props extends Record<string, any>>(Component: React.ComponentType<Props>) =>
	(props: Props) => (
		<Provider>
			<Component {...props} />
		</Provider>
	);
