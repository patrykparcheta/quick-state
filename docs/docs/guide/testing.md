---
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Testing QuickState

Testing is a critical part of the development process, ensuring that your state management logic works as expected. This
document will guide you through setting up your testing environment and writing tests for your QuickState-based
application.

## Setting Up Your Test Environment

To start testing your QuickState application, you'll need to set up your testing environment. Here's how you can do it:

1. Install your preferred testing framework (e.g., Jest, Mocha).
2. Set up a test runner and configure it to work with your project structure.
3. Install any additional assertion libraries or testing utilities you may need.

### Example using Jest:

```bash
npm install --save-dev jest @testing-library/react @testing-library/user-event @testing-library/dom
```

Add a Jest configuration file to your project, or add the Jest configuration to your `package.json`.

For additional information on configuration, kindly refer to the Jest documentation.

## Writing Tests

When writing tests for QuickState, you'll be testing the following:

- **Actions**: Ensure that actions modify the state as expected.
- **Selectors**: Validate that selectors return the correct slice of state.
- **Store**: Confirm that the store updates correctly in response to actions.

### Testing Actions

Actions should be tested to ensure they produce the expected state mutations. Here's an example of how to test an action:


<Tabs
defaultValue="tsx"
values={[
{ label: 'TypeScript', value: 'tsx', },
{ label: 'JavaScript', value: 'js', },
]}>

  <TabItem value="tsx">

```typescript
import {increaseCount} from "../actions";
import {store, MyState} from "../store";

describe("increaseCount action", () => {
    const initialState: MyState = {
        count: 0,
    };

    beforeEach(() => {
        store.setState(initialState);
    });

    test("should initialize with the correct state", () => {
        expect(store.getState()).toEqual(initialState);
    });

    test("should increase count by 1", () => {
        increaseCount();
        expect(store.getState().count).toBe(initialState.count + 1);
    });

    test("should handle multiple increaseCount actions", () => {
        increaseCount();
        increaseCount();
        expect(store.getState().count).toBe(initialState.count + 2);
    });
});
```

  </TabItem>
  <TabItem value="js">

```javascript
import {increaseCount} from "../actions";
import {store} from "../store";

describe("increaseCount action", () => {
	const initialState = {
		count: 0,
	};

	beforeEach(() => {
		store.setState(initialState);
	});

	test("should initialize with the correct state", () => {
		expect(store.getState()).toEqual(initialState);
	});

	test("should increase count by 1", () => {
		increaseCount();
		expect(store.getState().count).toBe(initialState.count + 1);
	});

	test("should handle multiple increaseCount actions", () => {
		increaseCount();
		increaseCount();
		expect(store.getState().count).toBe(initialState.count + 2);
	});
});
```

  </TabItem>
</Tabs>


### Testing Selectors

Selectors should be tested to verify that they compute and return the right data from the state. Consider the following
example:

<Tabs
defaultValue="tsx"
values={[
{ label: 'TypeScript', value: 'tsx', },
{ label: 'JavaScript', value: 'js', },
]}>

  <TabItem value="tsx">

```typescript
import {countSelector} from "./select-count";
import {store, MyState} from "../store";

describe("selectCount selector", () => {
    const initialState = {
        count: 0,
    };

    beforeEach(() => {
        store.setState(initialState);
    });

    it("should return the current count from state", () => {
        expect(countSelector(store.getState())).toBe(0);
    });

    it("should return the updated count when state changes", () => {
        store.setState({
            count: 10,
        });

        expect(countSelector(store.getState())).toBe(10);
    });
});
```

  </TabItem>
  <TabItem value="js">

```javascript
import {countSelector} from "./select-count";
import {store, MyState} from "../store";

describe("selectCount selector", () => {
    const initialState = {
        count: 0,
    };
    
    beforeEach(() => {
        store.setState(initialState);
    });
    
    it("should return the current count from state", () => {
		expect(countSelector(store.getState())).toBe(0);
    });
    
    it("should return the updated count when state changes", () => {
        store.setState({
            count: 10,
        });

		expect(countSelector(store.getState())).toBe(10);
    });
});
```

  </TabItem>
</Tabs>

## Integration with UI Components

Testing UI components that are connected to the QuickState store involves:

1. Rendering the components within a test environment.
2. Dispatching actions and verifying that the UI updates accordingly.
3. Checking that selectors are providing the right props to the components.

### Example with a Counter Component:


<Tabs
defaultValue="tsx"
values={[
{ label: 'TypeScript', value: 'tsx', },
{ label: 'JavaScript', value: 'js', },
]}>

  <TabItem value="tsx">

```typescript jsx
import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Counter} from "./counter";
import {IncrementButton} from "./increment-button";
import {MyStoreProvider} from "./state";

test("Counter component shows the count and can be incremented", () => {
    const {getByText} = render(
        <MyStoreProvider>
            <Counter />
            <IncrementButton />
        </MyStoreProvider>
    );

    expect(getByText("Speed: 0")).toBeInTheDocument();
    fireEvent.click(getByText("Increment"));
    expect(getByText("Speed: 1")).toBeInTheDocument();
});

```

  </TabItem>
  <TabItem value="js">

```javascript
import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {Counter} from "./counter";
import {IncrementButton} from "./increment-button";
import {MyStoreProvider} from "./state";

test("Counter component shows the count and can be incremented", () => {
    const {getByText} = render(
        <MyStoreProvider>
            <Counter />
            <IncrementButton />
        </MyStoreProvider>
    );
    
    expect(getByText("Speed: 0")).toBeInTheDocument();
    fireEvent.click(getByText("Increment"));
    expect(getByText("Speed: 1")).toBeInTheDocument();
});

```

  </TabItem>
</Tabs>

## Continuous Integration

Integrate your tests into a CI/CD pipeline to ensure they run automatically with every push or pull request. This helps catch issues early and maintain a stable codebase.

## Conclusion

Testing your state management effectively ensures the reliability of your application's data flow. By following the
principles outlined above, you can create a robust suite of tests for your QuickState-powered applications.
