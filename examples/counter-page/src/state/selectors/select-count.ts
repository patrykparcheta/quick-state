import {createSelector} from "../store";
import {Selector} from "@quickstate/core";
import {MyState} from "../types";

export const countSelector: Selector<MyState> = ({count}) => count;

export const selectCount = createSelector(countSelector);
