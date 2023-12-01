---
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Creating actions

Now that you have your own store set up, you can proceed to create actions. The createAction function, which is used to
generate actions, is available through the instance of your store. You should use this function to create actions that
can then be directly invoked.

When creating actions, you can take advantage of the structure provided by Immer since it is directly implemented in
createAction.

The action-creating function should return a `State | void | undefined`

```typescript
type CreateActionActionReturn<State extends object> = State | void | undefined;
```

## Creating action without payload

```typescript
type Action<State extends object> = (state: Draft<State>) => CreateActionActionReturn<Draft<State>>;

createAction(action: Action<State>): () => void;
```

### Example

```typescript
import {createAction} from "./store";

// create action
const increaseCount = createAction((draftState) => {
	draftState.count = draftState.count + 1;
});

// then you can execute it
increaseCount();
```


## Creating action with payload

```typescript
export type ActionWithPayload<State extends object, Payload> = (
    state: Draft<State>,
    payload: Payload
) => CreateActionActionReturn<Draft<State>>;

createAction<Payload>(action: ActionWithPayload<State, Payload>): (payload: Payload) => void;
```

### Example

<Tabs
defaultValue="tsx"
values={[
{ label: 'TypeScript', value: 'tsx', },
{ label: 'JavaScript', value: 'js', },
]}>

  <TabItem value="tsx">

```typescript
import {createAction} from "./store";

interface SetCountPayload {
    count: number;
}

// create action
const setCount = createAction<SetCountPayload>((draftState, payload) => {
    draftState.count = payload.count;
});

// then you can execute it to update state
setCount({count: 777});
```

  </TabItem>
  <TabItem value="js">

```javascript
import {createAction} from "./store";

// create action
const setCount = createAction((draftState, payload) => {
    draftState.count = payload.count;
});

// then you can execute it to update state
setCount({count: 777});
```

  </TabItem>
</Tabs>
