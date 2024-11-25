import {createContext} from "react";
import type {MakeStoreConfig, Store, StoreBase} from "./types";
import {getWithStateProviderHoc} from "./with-state-provider";
import {createSelectorImpl} from "./create-selector-impl";
import {useSelectedValueImpl} from "./use-selected-value-impl";
import {getStoreRandomId} from "./utils";
import {createProviderImpl} from "./create-provider-impl";
import {createStore} from "./create-store";

export const makeStore = <State extends object>(
	config: MakeStoreConfig<State>,
	storeName = `QuickState - ${getStoreRandomId()}`
): Store<State> => {
	const store = createStore(config, storeName);

	const StoreContext = createContext<StoreBase<State> | null>(null);

	const Provider: Store<State>["Provider"] = createProviderImpl(StoreContext, store);

	const createSelector: Store<State>["createSelector"] = createSelectorImpl(StoreContext);

	const useSelectValue: Store<State>["useSelectValue"] = useSelectedValueImpl(createSelector);

	const withStateProvider: Store<State>["withStateProvider"] = getWithStateProviderHoc(Provider);

	return {
		...store,
		Provider,
		createSelector,
		useSelectValue,
		withStateProvider,
	};
};
