import {createSelector} from "../store";
import {Selector} from "@quickstate/core";
import {MyState} from "../types";

export const countLoadingSelector: Selector<MyState> = ({countLoading}) => countLoading;

export const selectLoading = createSelector(countLoadingSelector);
