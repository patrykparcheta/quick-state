---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating store

If you have already installed QuickState, the next step is to create a store using makeStore function. Function for
creating a new store contains configuration object with initialState as the initial state of the store:

```typescript
interface MakeStoreConfig<State extends object> {
    initialState: State;
}

makeStore(config: MakeStoreConfig<State>): Store<State>
```

## Create store & methods

<Tabs
defaultValue="tsx"
values={[
{ label: 'TypeScript', value: 'tsx', },
{ label: 'JavaScript', value: 'js', },
]}>

  <TabItem value="tsx">
 
```typescript
import {makeStore} from "@quickstate/core";

export interface MyState {
    count: number;
}

export const store = makeStore<MyState>({
    initialState,
});

const {createSelector, createAction, Provider: MyStoreProvider} = store;

export {MyStoreProvider, createAction, createSelector};
```

  </TabItem>
  <TabItem value="js">

```javascript
import {makeStore} from "@quickstate/core";

export const store = makeStore({
	initialState,
});

const {createSelector, createAction, Provider: MyStoreProvider} = store;

export {MyStoreProvider, createAction, createSelector};
```

  </TabItem>
</Tabs>

## Initialization of the provider

You are just one step away! In the components where you intend to use created selectors, you need to activate the provider:

```typescript jsx
import {MyStoreProvider} from "./store";

export const App = () => {
    return (
        <MyStoreProvider>
            Components tree where you can use selectors
        </MyStoreProvider>
    );
}
```