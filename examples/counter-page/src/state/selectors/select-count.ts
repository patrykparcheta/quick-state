import {createSelector} from "../store";
import type {MyState} from "../types";

export const countSelector = ({count}: MyState) => count;

export const selectCount = createSelector(countSelector);
