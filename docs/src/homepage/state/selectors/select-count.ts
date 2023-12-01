import {Selector} from "@quickstate/core";

import {createSelector} from "../store";
import {MyState} from "../types";

const countSelector: Selector<MyState> = ({count}) => count;

export const selectCount = createSelector(countSelector);
