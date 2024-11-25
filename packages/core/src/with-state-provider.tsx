import React from "react";
import type {ResetTrigger, Store} from "./types";

export const getWithStateProviderHoc =
	<State extends object>(Provider: Store<State>["Provider"]) =>
	<Props extends Record<string, any>>(Component: React.ComponentType<Props>, resetTrigger?: ResetTrigger) =>
	(props: Props) => (
		<Provider resetTrigger={resetTrigger}>
			<Component {...props} />
		</Provider>
	);
