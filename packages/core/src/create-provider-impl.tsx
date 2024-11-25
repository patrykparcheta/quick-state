import type {Store, StoreBase} from "./types";
import React, {useEffect} from "react";

export const createProviderImpl =
	<State extends object>(
		StoreContext: React.Context<StoreBase<State> | null>,
		store: StoreBase<State>
	): Store<State>["Provider"] =>
	({children, resetTrigger}) => {
		const triggerValue = typeof resetTrigger === "function" ? resetTrigger() : resetTrigger;

		useEffect(() => {
			if (resetTrigger !== undefined) {
				store.resetState();
			}
		}, [triggerValue]);

		return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
	};
