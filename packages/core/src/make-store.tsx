import {produce} from "immer";
import React, {createContext} from "react";
import type {MakeStoreConfig, Store, StoreBase, TransformState} from "./types";
import {getWithStateProviderHoc} from "./with-state-provider";
import {createActionImpl} from "./create-action-impl";
import {createAsyncActionImpl} from "./create-async-action-impl";
import {setKeyValueImpl} from "./set-key-value-impl";
import {createSelectorImpl} from "./create-selector-impl";
import {useSelectedValueImpl} from "./use-selected-value-impl";
import {notifyDevToolsOfStateChange} from "./dev-tools";
import {setStateImpl} from "./set-state-impl";
import {getStoreRandomId} from "./utils";

export const makeStore = <State extends object>(
	config: MakeStoreConfig<State>,
	storeName = `QuickState - ${getStoreRandomId()}`
): Store<State> => {
	const createStore = (): StoreBase<State> => {
		const {initialState} = config;
		let state: State = initialState;

		let listeners: (() => void)[] = [];

		const subscribe: Store<State>["subscribe"] = (listener: () => void) => {
			listeners.push(listener);
			return () => {
				listeners = listeners.filter((l) => l !== listener);
			};
		};

		const getState = () => state;

		const publishState = (newState: State) => {
			state = newState;
			listeners.forEach((listener) => listener());
		};

		const transformState: TransformState<State> = (producer, actionDetails) => {
			const oldState = getState();
			const newState = produce(oldState, producer);

			publishState(newState);

			notifyDevToolsOfStateChange({
				storeName,
				newState,
				oldState,
				actionDetails,
			});
		};

		const setState: Store<State>["setState"] = setStateImpl(transformState);

		const createAction: Store<State>["createAction"] = createActionImpl(transformState);

		const createAsyncAction: Store<State>["createAsyncAction"] = createAsyncActionImpl(transformState);

		const setKeyValue: Store<State>["setKeyValue"] = setKeyValueImpl(transformState);

		return {
			setKeyValue,
			setState,
			getState,
			createAction,
			createAsyncAction,
			subscribe,
		};
	};

	const store = createStore();

	const StoreContext = createContext<StoreBase<State> | null>(null);

	const Provider: Store<State>["Provider"] = ({children}) => (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);

	const createSelector: Store<State>["createSelector"] = createSelectorImpl(StoreContext);

	const useSelectValue: Store<State>["useSelectValue"] = useSelectedValueImpl(createSelector);

	const withStateProvider = getWithStateProviderHoc(Provider);

	return {
		...store,
		Provider,
		createSelector,
		useSelectValue,
		withStateProvider,
	};
};
