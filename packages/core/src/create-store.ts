import {MakeStoreConfig, Store, StoreBase, TransformState} from "./types";
import {produce} from "immer";
import {notifyDevToolsOfStateChange} from "./dev-tools";
import {setStateImpl} from "./set-state-impl";
import {createActionImpl} from "./create-action-impl";
import {createAsyncActionImpl} from "./create-async-action-impl";
import {setKeyValueImpl} from "./set-key-value-impl";

export const createStore = <State extends object>(
	config: MakeStoreConfig<State>,
	storeName: string
): StoreBase<State> => {
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

	const createAsyncAction: Store<State>["createAsyncAction"] = createAsyncActionImpl(getState, transformState);

	const setKeyValue: Store<State>["setKeyValue"] = setKeyValueImpl(transformState);

	const resetState: Store<State>["resetState"] = () => setState(initialState, "resetState");

	return {
		setKeyValue,
		setState,
		resetState,
		getState,
		createAction,
		createAsyncAction,
		subscribe,
	};
};
