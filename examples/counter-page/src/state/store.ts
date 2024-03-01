import {makeStore} from "@quickstate/core";
import type {MyState} from "./types";
import {initialState} from "./initial-state";

export const store = makeStore<MyState>({
	initialState,
});

const {createSelector, createAsyncAction, createAction, Provider: MyStoreProvider, withStateProvider} = store;

export {MyStoreProvider, createAction, createAsyncAction, createSelector, withStateProvider};
