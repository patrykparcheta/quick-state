---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating selectors

Selectors are a means of extracting values from your state. In a manner akin to createAction, the store offers a
createSelector function that enables you to construct your selector.

You can later utilize these selectors only in the components. 

`createSelector` is essentially a factory for hooks, and the selectors it creates can only be utilized within components.

```typescript
createSelector: <Selected extends (state: State) => any>(selector: Selected) => () => ReturnType<Selected>;
```

## Creating selectors

```typescript
import {Selector} from "@quickstate/core";

import {createSelector} from "../store";
import {MyState} from "../types";

const countSelector: Selector<MyState> = ({count}) => count;

export const selectCount = createSelector(countSelector);
```

## Using selectors

To successfully integrate the selectors you've created, simply execute them in your component.

```typescript jsx
import {selectCount} from "./store";

export const Counter = () => {
    const count = selectCount();

    ...
```

## Selector with arguments

Occasionally, you may need to pass an argument into your selector. This can be achieved as follows:

```typescript
import {Selector} from "@quickstate/core";

import {createSelector} from "../store";
import {MyState} from "../types";

export const selectCount = (doubleIncrease?: boolean) =>
    createSelector(({count}) => (doubleIncrease ? count + count : count))();
```

And usage:

```typescript jsx
import {selectCount} from "./store";

export const Counter = () => {
    const count = selectCount(true);

    ...
```