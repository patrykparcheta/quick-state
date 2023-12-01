import {makeStore} from "@quickstate/core";
import type {MyState} from "./types";
import {initialState} from "./initial-state";

export const store = makeStore<MyState>({
	initialState,
});

const {createSelector, createAction, Provider: MyStoreProvider} = store;

export {MyStoreProvider, createAction, createSelector};
