import {makeStore} from "@quickstate/core";
import type {DevToolsState} from "./types";
import {initialState} from "./initial-state";

export const store = makeStore<DevToolsState>({
	initialState,
});

const {createAction, withStateProvider, useSelectValue, createSelector, setKeyValue} = store;

export {createAction, withStateProvider, useSelectValue, createSelector, setKeyValue};
