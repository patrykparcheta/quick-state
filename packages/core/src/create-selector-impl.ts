import type {Store, StoreBase} from "./types";
import React, {useContext, useSyncExternalStore} from "react";

export const createSelectorImpl =
	<State extends object>(StoreContext: React.Context<StoreBase<State> | null>): Store<State>["createSelector"] =>
	(selector) =>
	() => {
		const contextStore = useContext(StoreContext) as Store<State>;

		if (!contextStore) {
			throw new Error("Selector must be used within a Provider.");
		}

		const selectValue = () => selector(contextStore.getState());

		return useSyncExternalStore(contextStore.subscribe, selectValue, selectValue);
	};
