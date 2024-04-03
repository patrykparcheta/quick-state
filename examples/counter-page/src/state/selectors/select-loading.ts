import {createSelector} from "../store";
import type {MyState} from "../types";

export const countLoadingSelector = ({countLoading}: MyState) => countLoading;

export const selectLoading = createSelector(countLoadingSelector);
