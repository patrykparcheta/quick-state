import {produce} from "immer";
import {
	Action,
	ActionWithPayload,
	AsyncActionCreator,
	AsyncActionFulfilledMeta,
	AsyncActionPendingMeta,
	AsyncActionRejectedMeta,
	AsyncActionWithPayload,
	MakeStoreConfig,
	Selector,
	Store,
	StoreBase,
} from "./types";
import {isActionWithPayload} from "./utils";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getWithStateProviderHoc} from "./with-state-provider";

export const makeStore = <State extends object>(config: MakeStoreConfig<State>): Store<State> => {
	const createStore = (): StoreBase<State> => {
		const {initialState} = config;

		let state = initialState;

		let listeners: (() => void)[] = [];

		const subscribe: Store<State>["subscribe"] = (listener: () => void) => {
			listeners.push(listener);

			return () => {
				listeners = listeners.filter((l) => l !== listener);
			};
		};

		const getState = () => state;

		const publishNewState = (newState: State) => {
			state = newState;
			listeners.forEach((listener) => listener());
		};

		const setState: Store<State>["setState"] = (newState) => publishNewState(produce(getState(), () => newState));

		const createAction: Store<State>["createAction"] = <Payload,>(
			action: Action<State> | ActionWithPayload<State, Payload>
		) => {
			return function (this: any, ...args: unknown[]) {
				if (isActionWithPayload(action)) {
					const payload = args[0] as Payload;
					return void publishNewState(produce(getState(), (draft) => action(draft, payload)));
				}

				publishNewState(produce(getState(), action));
			} as any;
		};

		const createAsyncAction: Store<State>["createAsyncAction"] = <Creator extends AsyncActionCreator>(
			action: AsyncActionWithPayload<State, Creator>
		) => {
			return async function (this: any, ...args: Parameters<Creator>) {
				const {creator, onRejected, onFulfilled, onPending} = action;

				const pendingMeta: AsyncActionPendingMeta<Creator> = {
					parameters: args,
				};

				publishNewState(produce(getState(), (draft) => onPending(draft, pendingMeta)));

				try {
					const resolvedValue = await creator(...args);

					const fulfilledMeta: AsyncActionFulfilledMeta<Creator> = {
						parameters: args,
						result: resolvedValue as Awaited<ReturnType<Creator>>,
					};

					publishNewState(produce(getState(), (draft) => onFulfilled(draft, fulfilledMeta)));

					return fulfilledMeta;
				} catch (e) {
					const rejectedMeta: AsyncActionRejectedMeta<Creator> = {
						parameters: args,
						reason: e,
					};

					publishNewState(produce(getState(), (draft) => onRejected(draft, rejectedMeta)));

					return rejectedMeta;
				}
			};
		};

		return {
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

	const createSelector: Store<State>["createSelector"] =
		<Selected extends Selector<State>>(selector: Selected) =>
		() => {
			const useEnhancedSelector = () => {
				const contextStore = useContext(StoreContext) as Store<State>;

				if (!contextStore) {
					throw new Error("useSelector must be used within a Provider.");
				}

				const [selectedState, setSelectedState] = useState(() => selector(contextStore.getState()));

				useEffect(() => {
					const updateSelectedState = () => {
						const selectedValue = selector(contextStore.getState());

						if (JSON.stringify(selectedValue) !== JSON.stringify(selectedState)) {
							setSelectedState(selector(contextStore.getState()));
						}
					};

					return contextStore.subscribe(updateSelectedState);
				}, [selectedState, selector, contextStore]);

				return selectedState;
			};

			return useEnhancedSelector();
		};

	const withStateProvider = getWithStateProviderHoc(Provider);

	return {
		...store,
		Provider,
		createSelector,
		withStateProvider,
	};
};
