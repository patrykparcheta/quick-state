import type {Draft} from "immer";
import React from "react";

export interface MakeStoreConfig<State extends object> {
	initialState: State;
}

type CreateActionActionReturn<State extends object> = State | void | undefined;

export type Action<State extends object> = (state: Draft<State>) => CreateActionActionReturn<Draft<State>>;

export type ActionWithPayload<State extends object, Payload> = (
	state: Draft<State>,
	payload: Payload
) => CreateActionActionReturn<Draft<State>>;

export interface StoreBase<State extends object> {
	getState: () => State;
	setState(state: State): void;
	createAction(action: Action<State>): () => void;
	createAction<Payload>(action: ActionWithPayload<State, Payload>): (payload: Payload) => void;
	subscribe: (listener: () => void) => () => void;
}

export type Selector<State extends object> = (state: State) => any;

export interface Store<State extends object> extends StoreBase<State> {
	createSelector: <Selected extends Selector<State>>(selector: Selected) => () => ReturnType<Selected>;
	Provider: ({children}: {children: React.ReactNode}) => React.JSX.Element;
}
