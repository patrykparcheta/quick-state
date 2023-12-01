---
sidebar_position: 1
---

# Core concepts

QuickState is a library for application state management that draws from the best practices of Flux architecture,
strongly resembling this pattern. It provides a simple and predictable way to structure data and business logic in
applications.

1. State: This is a single object that contains all information about the application's state. The state is immutable,
which means that we do not change it directly, but instead generate a new state based on the previous one, ensuring
clarity and predictability of data flow.

2. Store: The store is the central place where the state is kept and from which notifications about its changes are sent
out. Stores are responsible for updating the state and informing about changes.

3. Actions: These are functions that describe what changes are to be made to the state. Actions can be without payload (
payload-free) or may include additional data (payload).

4. Dispatching Actions: The process of sending actions to the store, which then calculates the new state.

5. Subscriptions: Thanks to the subscription mechanism, components can "listen" to changes in stores, allowing them to
update appropriately after a state change. Subscriptions ensure that components will only react to changes that are
relevant to them.

Our library facilitates the management of complex application state, offering a one-way data flow and strict control
over state changes. This echoes the concepts of the Flux pattern, but they have been adapted and integrated in a way
that aims to simplify implementation and enhance the efficiency and scalability of applications.