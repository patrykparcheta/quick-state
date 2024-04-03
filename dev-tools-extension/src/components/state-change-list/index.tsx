import React from "react";
import {selectSelectedStateChangesList} from "../../state";
import {Box} from "@mui/material";
import {List} from "./list";

export const StateChangeList = () => {
	const stateChangesList = selectSelectedStateChangesList();

	return (
		<Box mb={2}>
			<List records={stateChangesList} />
		</Box>
	);
};
