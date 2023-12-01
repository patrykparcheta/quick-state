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
